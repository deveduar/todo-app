'use client';

import React, { useState } from 'react';
import TodoItem from '@/components/TodoItem';
import TodoInput from '@/components/TodoInput';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type Todo = {
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addTodo = (todoText: string) => {
    setTodos([...todos, { text: todoText, completed: false }]);
  };

  const completeTodo = (index: number) => {
    const todoToComplete = todos[index];
    setTodos(todos.filter((_, i) => i !== index));
    setCompletedTodos([...completedTodos, { ...todoToComplete, completed: true }]);
  };

  const uncompleteTodo = (index: number) => {
    const todoToUncomplete = completedTodos[index];
    setCompletedTodos(completedTodos.filter((_, i) => i !== index));
    setTodos([...todos, { ...todoToUncomplete, completed: false }]);
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const removeCompletedTodo = (index: number) => {
    setCompletedTodos(completedTodos.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
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
                todos.map((todo, index) => (
                  <TodoItem
                    key={index}
                    index={index}
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
                completedTodos.map((todo, index) => (
                  <TodoItem
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={uncompleteTodo}
                    removeTodo={removeCompletedTodo}
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
