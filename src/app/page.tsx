import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto">
      <h1 className="mt-16 text-5xl text-center font-bold">ToDo List</h1>
      <TodoForm />
      <TodoItem />
    </main>
  )
}
