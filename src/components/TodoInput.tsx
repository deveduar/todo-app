import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CirclePlus, CalendarIcon, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  todo: z.string().min(1, "Task is required"),
  due_date: z.date().optional(),
  due_time: z.string().optional(),
  reminder_date: z.date().optional(),
  reminder_time: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type TodoInputProps = {
  addTodo: (todo: string, dueDate?: Date, reminderDate?: Date) => void;
};

const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 5) {
      const hours = i.toString().padStart(2, '0');
      const minutes = j.toString().padStart(2, '0');
      times.push(`${hours}:${minutes}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();


const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: '',
      due_date: undefined,
      due_time: undefined,
      reminder_date: undefined,
      reminder_time: undefined,
    },
  });

  const toLocal = (date: Date | undefined, time: string | undefined) => {
    if (!date) return undefined;
  
    const localDate = new Date(date);
  
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      localDate.setHours(hours, minutes, 0, 0); // Usa la hora local especificada
    } else {
      // Si no se proporciona una hora, usa la hora local actual y añade 5 horas
      const now = new Date();
      const localHours = now.getHours() + 5;
      localDate.setHours(localHours, now.getMinutes(), 0, 0); // Añade 5 horas a la hora actual
    }
  
    return localDate;
  };
  
  

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const dueDate = toLocal(data.due_date, data.due_time);
      const reminderDate = toLocal(data.reminder_date, data.reminder_time);

      // Debug: Log the dates before sending to DB
      console.log('Due Date:', dueDate);
      console.log('Reminder Date:', reminderDate);

      await addTodo(data.todo, dueDate, reminderDate);
      toast({
        title: "Task added",
        description: "Your task has been added successfully.",
      });
      form.reset();
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error",
        description: "There was an error adding your task.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-7 p-2">
{/* input */}
        <div className="flex space-x-6 items-center">
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter a task"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />
        </div>
{/* Due date */}
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className={cn(
                  "pl-3 text-left font-normal",
                  !form.getValues('due_date') && "text-muted-foreground"
                )}
              >
                {form.getValues('due_date') ? (
                  format(form.getValues('due_date') as Date, "PPP")
                ) : (
                  <span>Due date</span>
                )}
                <CalendarIcon className="ml-4 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col space-y-2">
                <Calendar
                  mode="single"
                  selected={form.getValues('due_date') as Date | undefined}
                  onSelect={(date) => {
                    if (date) {
                      form.setValue('due_date', new Date(date), { shouldValidate: true });
                    }
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
          <div className={cn(
            "pl-3 text-left font-normal flex items-center",
            !form.getValues('due_time') && "text-muted-foreground"
          )}>
            <Select
              onValueChange={(value) => form.setValue('due_time', value, { shouldValidate: true })}
              value={form.getValues('due_time') || ''}
            >
              <SelectTrigger>
                <Clock className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Due time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
{/* Reminder Date */}
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className={cn(
                  "pl-3 text-left font-normal",
                  !form.getValues('reminder_date') && "text-muted-foreground"
                )}
              >
                {form.getValues('reminder_date') ? (
                  format(form.getValues('reminder_date') as Date, "PPP")
                ) : (
                  <span>Reminder date</span>
                )}
                <CalendarIcon className="ml-4 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col space-y-2">
                <Calendar
                  mode="single"
                  selected={form.getValues('reminder_date') as Date | undefined}
                  onSelect={(date) => {
                    if (date) {
                      form.setValue('reminder_date', new Date(date), { shouldValidate: true });
                    }
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
          <div className={cn(
            "pl-3 text-left font-normal flex items-center",
            !form.getValues('reminder_time') && "text-muted-foreground"
          )}>
            <Select
              onValueChange={(value) => form.setValue('reminder_time', value, { shouldValidate: true })}
              value={form.getValues('reminder_time') || ''}
            >
              <SelectTrigger>
                <Clock className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Reminder time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button type="submit" disabled={isLoading} className="flex items-center justify-center">
            {isLoading ? 'Loading...' : <CirclePlus className="w-4 h-4 m-0" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TodoInput;
