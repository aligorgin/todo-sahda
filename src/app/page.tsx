'use client';

import { useEffect, useState } from 'react';
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

interface Task {
	id: string;
	item: string;
	todoStatu: string;
	addDate: string;
	completDate: string | null;
}

export default function Home() {
	const [tasks, setTasks] = useState<Task[]>([
		// {
		// 	id: "543",
		// 	item: "Learn NextJS",
		// 	todoStatu: "2",
		// 	addDate: "2023-11-29 18:04:09",
		// 	completDate: "2023-11-30 18:04:09",
		// },
		// {
		// 	id: "253",
		// 	item: "wash dishes",
		// 	todoStatu: "1",
		// 	addDate: "2023-12-29 18:04:09",
		// 	completDate: null,
		// },
	]);
	const [loading, setLoading] = useState<boolean>(true);

	const toggleTaskCompletion = (taskId: string, completed: boolean) => {
		setTasks((prevState) =>
			prevState.map((task) =>
				task.id === taskId ? { ...task, todoStatu: completed ? '2' : '1' } : task
			)
		);
	};

	const handleDelete = (taskId: string) => {
		setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
	};

	const addTask = (text: string) => {
		const newTask: Task = {
			id: (Math.random() * 1000).toString(),
			item: text,
			todoStatu: '0',
			addDate: new Date().toISOString(),
			completDate: null,
		};

		setTasks((prevState) => [...prevState, newTask]);
	};

	useEffect(() => {
		getTasks()
			.then((res: any) => {
				const combinedTasks = [...res.completed, ...res.uncompleted];
				setTasks(combinedTasks);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<main className="max-w-xl mx-auto">
			<h1 className="mt-16 text-5xl text-center font-bold">ToDo List</h1>
			<TodoForm onAdd={addTask} />
			{loading ? 'Loading...' :
				(<TodoList tasks={tasks} onToggle={toggleTaskCompletion} onDelete={handleDelete} />)}
		</main>
	);
}

const getTasks = async () => {
	try {
		const response = await fetch(`https://hr-todo.sahda.ir/`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};