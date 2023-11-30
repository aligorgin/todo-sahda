import { TrashIcon } from "@heroicons/react/24/outline";
import clsx from 'clsx';

interface Task {
    id: string;
    item: string;
    todoStatu: string;
    addDate: string;
    completDate: string | null;
}

interface TodoItemProps {
    todo: Task;
    onToggle: (completed: boolean) => void;
    onDelete: () => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    const isCompleted = todo.todoStatu === '2';

    const handleToggle = () => onToggle(!isCompleted);
    const handleDeleteClick = () => onDelete();

    return (
        <div className='flex justify-center items-center mt-2 bg-zinc-800 p-2 w-[405px] mx-auto rounded-md'>
            <div className="flex-1 flex items-center overflow-x-auto">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleToggle}
                    className='cursor-pointer w-4 focus:ring-0 focus:outline-none'
                />
                <p className={clsx("pl-3 text-lg whitespace-nowrap", isCompleted && 'line-through')}>{todo.item}</p>
            </div>
            <div className="border-l pl-3">
                <TrashIcon
                    onClick={handleDeleteClick}
                    className="w-6 hover:cursor-pointer hover:text-zinc-400"
                />
            </div>
        </div>
    );
};
