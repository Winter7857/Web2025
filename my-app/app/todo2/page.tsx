'use client'
import { useState } from "react";
interface TaskType {
    id: number;
    name: string;
    time: number;
}

const STYLE = 'border-2 border-black px-2'


export default function Todo2() {

    const [formTask, setFormTask] = useState<TaskType>({ id: -1, name: '', time: 0 });

    const [tasks, setTasks] = useState<TaskType[]>([
        { id: 1, name: "Reading a book", time: 100 },
        { id: 2, name: "Writing a program", time: 30 },
        { id: 3, name: "Sleeping", time: 120 },
    ]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormTask({ ...formTask, [name]: value });
    }

    function addTask() {
        if (formTask.name === "" || formTask.time === 0) {
            alert("Please check value!")
            return;
        }
        const newTask = {
            ...formTask,
            id: (tasks.length) ? tasks[tasks.length - 1].id + 1 : 1
        };
        setTasks([...tasks, newTask]);
        setFormTask({ id: -1, name: '', time: 0 });
    }

    function deleteTask(id: number) {
        console.log("ID: ", id)
        const newTasks = tasks.filter((task) => (task.id !== id))
        setTasks(newTasks);
    }

    function editTask(id: number) {
        console.log("ID: ", id)
        const index = tasks.findIndex((task) => (task.id === id))
        console.log(tasks[index]);
        setFormTask(tasks[index]);
    }

    function updateTask() {
        const newTasks = tasks.map((task) =>
            (task.id === formTask.id) ? formTask : task);
        setTasks([...newTasks])
        setFormTask({ id: -1, name: '', time: 0 });
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Todo2</h1>
            <h2 className="text-xl font-bold">
                {formTask.id === -1 ? "Add" : "Update"} task
            </h2>
            <div className="mb-4 border-2 border-black w-fit p-4 mt-2 rounded-lg shadow-lg">
                <div className="mb-2">
                    <div>
                        <label htmlFor="name">Name: </label>
                    </div>
                    <div>
                        <input
                            className={STYLE}
                            type="text" name="name"
                            value={formTask.name}
                            onChange={handleInput}
                            required
                        />
                    </div>

                </div>
                <div className="mb-2">
                    <div>
                        <label htmlFor="name">Time: </label>
                    </div>
                    <div>
                        <input
                            className={STYLE}
                            type="number" name="time"
                            value={formTask.time}
                            onChange={handleInput}
                            required
                        />
                    </div>

                </div>
                <div>
                    <button className={`${STYLE} bg-blue-800 text-white rounded-xl hover:text-black hover:bg-blue-200`}
                        onClick={
                            formTask.id === -1 ? addTask : updateTask
                        }
                    >
                        {formTask.id === -1 ? "Add" : "Update"}
                    </button>
                </div>

            </div>

            <h2 className="text-xl font-bold">List task</h2>
            <ul>
                {tasks.map((task, index) =>
                (<li key={index}>
                    {task.id}. {task.name}: {task.time}
                    <button
                        className={`${STYLE} ml-2 mt-2 rounded-xl bg-red-800 text-white hover:text-black hover:bg-red-200`}
                        onClick={() => deleteTask(task.id)}
                    >delete</button>
                    <button
                        className={`${STYLE} ml-2 mt-2 rounded-xl bg-green-800 text-white hover:text-black hover:bg-green-200`}
                        onClick={() => editTask(task.id)}
                    >edit</button>
                </li>)
                )}
            </ul>
        </div>
    )
}