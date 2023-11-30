'use client';

import React from 'react';
import TodoItem from './TodoItem';

interface Task {
    id: string;
    item: string;
    todoStatu: string;
    addDate: string;
    completDate: string | null;
}

interface TodoListProps {
    tasks: Task[];
    onToggle: (taskId: string, completed: boolean) => void;
    onDelete: (taskId: string) => void;
}

export default function TodoList({ tasks, onToggle, onDelete }: TodoListProps) {
    console.log(tasks)
    return (
        <div>
            {tasks && tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    todo={task}
                    onToggle={(completed: boolean) => onToggle(task.id, completed)}
                    onDelete={() => onDelete(task.id)}
                />
            ))}
        </div>
    );
};