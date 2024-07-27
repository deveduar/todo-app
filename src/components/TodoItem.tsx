import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2 } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';

type TodoItemProps = {
  id: string;
  todo: {
    text: string;
    completed: boolean;
    created_at: string | null;
    due_date: string | null;
    completed_at: string | null;
    reminder_date: string | null;
  };
  completeTodo: (id: string) => void;
  uncompleteTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  isCompleted?: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, todo, completeTodo, uncompleteTodo, removeTodo, isCompleted }) => {
  const timeZone = 'Europe/Madrid';

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    const utcDate = new Date(dateStr);
    return formatInTimeZone(utcDate, timeZone, 'dd/MM/yy HH:mm:ss zz', { locale: es });
  };

  return (
    <div className="flex justify-between items-center p-2 shadow rounded-lg mb-2 bg-[var(--card)] text-[var(--card-foreground)] dark:border dark:border-x-0 dark:border-t-0  dark:border-border">
    <div className="flex items-center space-x-2 flex-1 ">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => {
          if (todo.completed) {
            uncompleteTodo(id);
          } else {
            completeTodo(id);
          }
        }}
        id={`todo-${id}`}
      />
      
      <HoverCard>
        <HoverCardTrigger>
          <Label
            className={`flex-1 ${todo.completed ? 'line-through text-[var(--muted-foreground)]' : ''}`}
            style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
          >
            {todo.text}
          </Label>
        </HoverCardTrigger>
        <HoverCardContent className="space-y-1 text-sm text-[var(--foreground)]">
          <p><strong>Created At:</strong> {formatDateTime(todo.created_at)}</p>
          <p><strong>Due Date:</strong> {formatDateTime(todo.due_date)}</p>
          <p><strong>Completed At:</strong> {formatDateTime(todo.completed_at)}</p>
          <p><strong>Reminder Date:</strong> {formatDateTime(todo.reminder_date)}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
    {/* <div>
      <p><strong>Created At:</strong> {formatDateTime(todo.created_at)}</p>
      <p><strong>Due Date:</strong> {formatDateTime(todo.due_date)}</p>
      <p><strong>Completed At:</strong> {formatDateTime(todo.completed_at)}</p>
      <p><strong>Reminder Date:</strong> {formatDateTime(todo.reminder_date)}</p>
    </div> */}
    <Button onClick={() => removeTodo(id)} variant="ghost" className="text-[var(--destructive)]">
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
  
  );
};

export default TodoItem;
