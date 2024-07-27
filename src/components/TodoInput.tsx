import React, { useState, useEffect } from 'react';
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

const generateTimeOptions = (referenceDate: Date, isCurrentDate: boolean) => {
  const times = [];
  const startHour = isCurrentDate ? referenceDate.getHours() : 0;
  const startMinute = isCurrentDate ? referenceDate.getMinutes() : 0;

  for (let i = startHour; i < 24; i++) {
    for (let j = (i === startHour ? startMinute : 0); j < 60; j += 5) {
      const hours = i.toString().padStart(2, '0');
      const minutes = j.toString().padStart(2, '0');
      times.push(`${hours}:${minutes}`);
    }
  }
  return times;
};

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dueTimeOptions, setDueTimeOptions] = useState<string[]>([]);
  const [reminderTimeOptions, setReminderTimeOptions] = useState<string[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>(undefined);
  const [selectedReminderDate, setSelectedReminderDate] = useState<Date | undefined>(undefined);
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

  // Update time options based on selected date
  useEffect(() => {
    const now = new Date();
    if (selectedDueDate && selectedDueDate.toDateString() === now.toDateString()) {
      setDueTimeOptions(generateTimeOptions(now, true));
    } else {
      setDueTimeOptions(generateTimeOptions(new Date(), false));
    }
  }, [selectedDueDate]);

  useEffect(() => {
    const now = new Date();
    if (selectedReminderDate && selectedReminderDate.toDateString() === now.toDateString()) {
      setReminderTimeOptions(generateTimeOptions(now, true));
    } else {
      setReminderTimeOptions(generateTimeOptions(new Date(), false));
    }
  }, [selectedReminderDate]);

  const toLocal = (date: Date | undefined, time: string | undefined) => {
    if (!date) return undefined;
  
    const localDate = new Date(date);
  
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      localDate.setHours(hours, minutes, 0, 0);
    } else {
      const now = new Date();
      const localHours = now.getHours() + 5;
      localDate.setHours(localHours, now.getMinutes(), 0, 0);
    }
  
    return localDate;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const dueDate = toLocal(data.due_date, data.due_time);
      const reminderDate = toLocal(data.reminder_date, data.reminder_time);

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

  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
        <CardDescription>Fill out the form below to add a new task</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-7 p-2">
            {/* Input */}
            <div className="flex flex-col">
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

            {/* Due Date and Time */}
            <div className="flex flex-col  space-y-4">
              {/* Due Date */}
              <div className="flex-1 flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal w-full",
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
                        disabled={disablePastDates}
                        onDayClick={(date) => {
                          if (!disablePastDates(date)) {
                            form.setValue('due_date', new Date(date), { shouldValidate: true });
                            setSelectedDueDate(new Date(date));
                          }
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Due Time */}
              <div className={cn(
                        " text-left font-normal w-full",
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
                    {dueTimeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reminder Date and Time */}
            <div className="flex flex-col  space-y-4">
              {/* Reminder Date */}
              <div className="flex-1 flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal w-full",
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
                        disabled={disablePastDates}
                        onDayClick={(date) => {
                          if (!disablePastDates(date)) {
                            form.setValue('reminder_date', new Date(date), { shouldValidate: true });
                            setSelectedReminderDate(new Date(date));
                          }
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Reminder Time */}
              <div className={cn(
                        " text-left font-normal w-full",
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
                    {reminderTimeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="self-start" disabled={isLoading}>
              {isLoading ? "Adding..." : <CirclePlus className="mr-2 h-4 w-4" />} Add Task
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>Use this form to add a new task with optional due and reminder dates and times.</p>
      </CardFooter>
    </Card>
  );
};

export default TodoInput;
