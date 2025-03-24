"use client";
import { useState } from "react";

interface TaskType {
  id: number;
  name: string;
  time: number;
  isDone: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, name: "Reading a book", time: 100, isDone: true },
    { id: 2, name: "Writing a program", time: 30, isDone: false },
    { id: 3, name: "Sleeping", time: 120, isDone: false },
  ]);

  const toggleDone = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">✅ Task List</h1>
      {tasks.map(task => (
        <div key={task.id} className="flex items-center justify-between border p-3 mb-2 rounded shadow">
          <div>
            <p className="font-semibold">{task.name}</p>
            <p className="text-sm text-gray-500">{task.time} mins</p>
          </div>
          <input type="checkbox" checked={task.isDone} onChange={() => toggleDone(task.id)} />
        </div>
      ))}
    </div>
  );
}
