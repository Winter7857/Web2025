"use client";
import { useState } from "react";

export default function TodoList() {
    const [tasks, setTasks] = useState<string[]>([]); // List of tasks
    const [task, setTask] = useState<string>(""); // New task input
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which task is being edited
    const [editedTask, setEditedTask] = useState<string>(""); // Store the updated task

    // Add a new task
    function addTask() {
        if (task.trim() === "") return; // Prevent empty tasks
        setTasks([...tasks, task]); // Add new task
        setTask(""); // Clear input
    }

    // Remove a specific task
    function removeTask(index: number) {
        setTasks(tasks.filter((_, i) => i !== index)); // Filter out the selected task
    }

    // Edit a specific task
    function editTask(index: number) {
        setEditingIndex(index); // Set editing mode
        setEditedTask(tasks[index]); // Load existing task into input
    }

    // Save the edited task
    function saveTask(index: number) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editedTask; // Update task
        setTasks(updatedTasks);
        setEditingIndex(null); // Exit editing mode
    }

    // Clear all tasks
    function clearAllTasks() {
        setTasks([]); // Empty the tasks list
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>

            {/* Task Input */}
            <div className="mb-4">
                <label htmlFor="task" className="mr-2">Task:</label>
                <input
                    type="text"
                    name="task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="border border-black rounded-md px-2 py-1"
                />
            </div>

            {/* Add & Clear Buttons */}
            <div className="mb-4">
                <button
                    onClick={addTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
                >
                    Add Task
                </button>
                <button
                    onClick={clearAllTasks}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                    Clear All
                </button>
            </div>

            {/* Task List */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Tasks:</h2>
                <ul className="list-disc pl-6">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks available</p>
                    ) : (
                        tasks.map((t, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                {editingIndex === index ? (
                                    // Editing Mode
                                    <input
                                        type="text"
                                        value={editedTask}
                                        onChange={(e) => setEditedTask(e.target.value)}
                                        className="border border-black rounded-md px-2 py-1"
                                    />
                                ) : (
                                    // Display Task
                                    <span>{t}</span>
                                )}

                                <div className="space-x-2">
                                    {editingIndex === index ? (
                                        <button
                                            onClick={() => saveTask(index)}
                                            className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => editTask(index)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-700"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    
                                    <button
                                        onClick={() => removeTask(index)}
                                        className="bg-red-400 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
