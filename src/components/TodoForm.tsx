import { PlusIcon } from "@heroicons/react/24/outline";

export default function TodoForm() {
    return (
        <form className="mt-16 flex justify-center space-x-2 items-center w-full">
            <input type="text" className="py-2 px-4 rounded-md text-black focus:outline-none w-[350px] focus:border-black focus:ring-0" />
            <button type="submit" className="p-2 rounded-md bg-white">
                <PlusIcon className="w-6 text-black" />
            </button>
        </form>
    )
}