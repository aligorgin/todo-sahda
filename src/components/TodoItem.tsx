import { TrashIcon } from "@heroicons/react/24/outline";

export default function TodoItem() {
    return (
        <div className="flex justify-center items-center mt-8 bg-zinc-800 p-2 w-[405px] mx-auto rounded-md">
            <div className="flex-1 flex items-center">
                <input type="checkbox" className="cursor-pointer w-4  focus:ring-0 focus:outline-none" />
                <p className="pl-3 text-lg">wash dieshes</p>
            </div>
            <div className="border-l pl-3">
                <TrashIcon className="w-6 hover:cursor-pointer hover:text-zinc-400" />
            </div>
        </div>
    )
}