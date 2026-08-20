import Sidebar from "./components/SideBar.jsx";
import BlankProject from "./components/BlankProject.jsx";
import {useState} from "react";
import ProjectForm from "./components/ProjectForm.jsx";
import Project from "./components/Project.jsx";

function App() {
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Project uno",
            description: "This is a sample project.",
            dueDate: "2024-01-01",
            tasks: [
                {
                    id: 1,
                    description: "Task one",
                    completed: false
                }
            ]
        }
    ]);
    const [mode, setMode] = useState('init');
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

    const updateProjectById = (projectId, callback) => {
        setProjects(prevProjects =>
            prevProjects.map(p => p.id === projectId ? callback(p) : p)
        );
    };

    const updateProjectTasks = (projectId, callback) => {
        updateProjectById(projectId, (project) => ({
            ...project,
            tasks: callback(project.tasks)
        }));
    };

    const appendProject = (project) => {
        setProjects(prevState => [...prevState, project]);
    };

    const removeProject = (id) => {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    };

    const removeTask = (projectId, taskId) => {
        updateProjectTasks(projectId, (tasks) =>
            tasks.filter(task => task.id !== taskId)
        );
    };

    const appendTask = (projectId, newTask) => {
        updateProjectTasks(projectId, (tasks) => [...tasks, newTask]);
    };

    const toggleTaskCompleted = (projectId, taskId) => {
        updateProjectTasks(projectId, (tasks) =>
            tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const updateProject = (updatedProject) => {
        updateProjectById(updatedProject.id, () => updatedProject);
    };

    const viewProject = (id) => {
        setSelectedProjectIndex(projects.findIndex(project => project.id === id));
    };

    const changeMode = (mode) => {
        setMode(mode);
    };

return (
    <main className="relative h-screen">
            <div className="flex items-start">
                <Sidebar projects={projects}
                         selectProject={viewProject}
                         changeMode={changeMode}
                />
                <section className="main-content w-full h-screen overflow-auto p-6 pt-[68px] force-light-mode">
                    { mode === 'init' &&
                        <BlankProject changeMode={changeMode} />
                    }
                    { mode === 'create' &&
                        <ProjectForm addProject={appendProject}
                                     changeMode={changeMode}
                        />
                    }
                    { mode === 'view' &&
                        <Project project={projects[selectedProjectIndex]}
                                 addTask={appendTask}
                                 removeTask={removeTask}
                                 toggleTaskCompleted={toggleTaskCompleted}
                                 deleteProject={removeProject}
                                 changeMode={changeMode}
                                 updateProject={updateProject}
                        />
                    }
                </section>
            </div>
        </main>
);
}

export default App;
