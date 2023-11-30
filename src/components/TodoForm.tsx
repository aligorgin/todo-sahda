'use client';

import { useState } from 'react';
import { PlusIcon } from "@heroicons/react/24/outline";

interface TodoFormProps {
    onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
    const [taskText, setTaskText] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskText.trim() !== '') {
            onAdd(taskText);
            setTaskText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-16 mb-6 flex justify-center space-x-2 items-center w-full">
            <input
                type="text"
                maxLength={50}
                value={taskText}
                onChange={handleInputChange}
                className="py-2 px-4 rounded-md text-black focus:outline-none w-[350px] focus:border-black focus:ring-0"
                placeholder="Your ToDo..."
            />
            <button type="submit" className="p-2 rounded-md bg-white">
                <PlusIcon className="w-6 text-black" />
            </button>
        </form>
    );
};