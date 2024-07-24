import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2 } from 'lucide-react';

type TodoItemProps = {
  index: number;
  todo: { text: string; completed: boolean };
  completeTodo: (index: number) => void;
  removeTodo: (index: number) => void;
  isCompleted?: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ index, todo, completeTodo, removeTodo, isCompleted }) => {
  return (
    <div className="flex justify-between items-center p-2 ">
      <div className="flex items-center space-x-2 flex-1">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => completeTodo(index)}
          id={`todo-${index}`}
        />
        <Label
          className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
          // htmlFor={`todo-${index}`}
          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
        >
          {todo.text}
        </Label>
      </div>
      <Button onClick={() => removeTodo(index)} variant="ghost">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
