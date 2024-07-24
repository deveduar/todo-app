'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CirclePlus } from 'lucide-react';
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define el esquema usando zod
const formSchema = z.object({
  todo: z.string().min(1, "Task is required"),
});

// Define el tipo de datos del formulario
type FormData = z.infer<typeof formSchema>;

type TodoInputProps = {
  addTodo: (todo: string) => void;
};

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: ''
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    try {
      addTodo(data.todo);
      // Reset the form input after successful submission
      form.reset();
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({ todo: '' });
    }
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start p-2">
        <div className="flex-1">
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col">
                  <FormLabel className="sr-only">Task</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a task"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="ml-2"
        >
          {isLoading ? (
            'Loading...'
          ) : (
            <CirclePlus className="w-5 h-5" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TodoInput;
