import {useState, useRef} from "react";

export default function ProjectTasks({tasks}) {
    const handleTaskUpdate = (taskId, newStatus) => {

    }

    if(!tasks || tasks.length === 0) return (
        <ul className="mt-4 space-y-2 text-center">
            <li className="flex items-center gap-2.5 text-center">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-400">
                    No tasks found
                </span>
            </li>
        </ul>
    );

    return <ul className="mt-4 space-y-2">
        { tasks.map(task => (
            <li key={task.id} className="flex items-center gap-2.5">
                <input type="checkbox"
                       checked={task.completed}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-400">
                    {task.description}
                </span>
            </li>
        ))}
    </ul>;
}
