'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import TodoItem from '@/components/TodoItem';
import TodoInput from '@/components/TodoInput';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    const incomplete = data.filter((task: Todo) => !task.completed);
    const completed = data.filter((task: Todo) => task.completed);

    setTodos(incomplete);
    setCompletedTodos(completed);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todoText: string) => {
    const { error } = await supabase.from('tasks').insert([{ text: todoText, completed: false }]);

    if (error) {
      console.error('Error adding task:', error);
      return;
    }

    fetchTodos();
  };

  const completeTodo = async (id: string) => {
    const { error } = await supabase.from('tasks').update({ completed: true }).eq('id', id);

    if (error) {
      console.error('Error completing task:', error);
      return;
    }

    fetchTodos();
  };

  const uncompleteTodo = async (id: string) => {
    const { error } = await supabase.from('tasks').update({ completed: false }).eq('id', id);

    if (error) {
      console.error('Error uncompleting task:', error);
      return;
    }

    fetchTodos();
  };

  const removeTodo = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      console.error('Error removing task:', error);
      return;
    }

    fetchTodos();
  };

  return (
    <div>
      <TodoInput addTodo={addTodo} />

      <Tabs defaultValue="todos" className="mt-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="todos">
          <Card>
            <CardHeader>
              <CardTitle>Todos</CardTitle>
            </CardHeader>
            <CardContent>
              {todos.length === 0 ? (
                <p className="text-gray-500">No todos yet.</p>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Todos</CardTitle>
            </CardHeader>
            <CardContent>
              {completedTodos.length === 0 ? (
                <p className="text-gray-500">No completed todos yet.</p>
              ) : (
                completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    todo={todo}
                    completeTodo={uncompleteTodo}
                    removeTodo={removeTodo}
                    isCompleted
                  />
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TodoList;
