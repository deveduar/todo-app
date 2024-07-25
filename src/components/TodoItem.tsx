import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2 } from 'lucide-react';

type TodoItemProps = {
  id: string;
  todo: { text: string; completed: boolean };
  completeTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  isCompleted?: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, todo, completeTodo, removeTodo, isCompleted }) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center space-x-2 flex-1">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => completeTodo(id)}
          id={`todo-${id}`}
        />
        <Label
          className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
        >
          {todo.text}
        </Label>
      </div>
      <Button onClick={() => removeTodo(id)} variant="ghost">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
