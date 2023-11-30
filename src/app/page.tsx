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

	const toggleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
		try {
			const newStatus = isCompleted ? '1' : '2';
			const response = await fetch(`https://hr-todo.sahda.ir/update.php`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: taskId,
					todoStatu: newStatus,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to update task status');
			}

			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === task.id ? { ...task, todoStatu: newStatus } : task
				)
			);
		} catch (error) {
			console.error('Error updating task status:', error);
		}
	};


	const handleDelete = async (taskId: string) => {
		try {
			const response = await fetch('https://hr-todo.sahda.ir/delete.php', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: taskId,
					type: 2,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to delete task');
			}

			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};

	const addTask = async (text: string) => {
		try {
			const response = await fetch('https://hr-todo.sahda.ir/create/task/', {
				method: 'POST',
				headers: {
					"key": "Content-Type",
					"value": "application/vnd.api+json",
					"type": "text"
				},
				body: JSON.stringify({
					id: (Math.random() * 1000).toString(),
					item: text,
					todoStatu: '1',
					addDate: new Date().toISOString(),
					completDate: null,
				}),
			});
			if (!response.ok) {
				throw new Error('Failed to add task');
			}

			const newTask = await response.json();

			setTasks((prevTasks) => [...prevTasks, newTask]);
		} catch (error) {
			console.error('Error adding task:', error);
		}
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