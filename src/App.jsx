import Sidebar from "./components/SideBar.jsx";
import BlankProject from "./components/BlankProject.jsx";
import {useState} from "react";
import ProjectForm from "./components/ProjectForm.jsx";
import Project from "./components/Project.jsx";
import Toast from "./components/common/Toast.jsx";

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
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [ toast, setToast ] = useState({
        type: 'success',
        message: ''
    });
    const [ showToast, setShowToast ] = useState(false);

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

    const addProject = (project) => {
        setProjects(prevState => [...prevState, project]);
    };

    const deleteProject = (id) => {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
        setSelectedProjectId(null);
    };

    const removeTask = (projectId, taskId) => {
        updateProjectTasks(projectId, (tasks) =>
            tasks.filter(task => task.id !== taskId)
        );
    };

    const addTask = (projectId, newTask) => {
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

    const selectProject = (id) => {
        setSelectedProjectId(id);
    };

    const getSelectedProject = () => {
        return selectedProjectId ? projects.find(project => project.id === selectedProjectId) : {};
    };

    const changeMode = (mode) => {
        if(mode === "init" && selectedProjectId) setSelectedProjectId(null);
        setMode(mode);
    };

    const displayToast = (showToast = true, type = "success", message = "") => {
        setToast({ message, type});
        setShowToast(showToast);
    };

    return (
        <>
            { showToast &&
                <Toast type={toast.type}
                       message={toast.message}
                       resetToast={() => displayToast(false, 'success', '')}
                />
            }
            <main className="relative h-screen">
                <div className="flex items-start">
                    <Sidebar projects={projects}
                             selectProject={selectProject}
                             changeMode={changeMode}
                    />
                    <section className="main-content w-full h-screen overflow-auto p-6 pt-[68px] force-light-mode">
                        { mode === 'init' &&
                            <BlankProject changeMode={changeMode} />
                        }
                        { mode === 'create' &&
                            <ProjectForm displayToast={(message) => displayToast(true, 'success', message)}
                                         addProject={addProject}
                                         changeMode={changeMode}
                            />
                        }
                        { mode === 'view' &&
                            <Project displayToast={(message) => displayToast(true, 'success', message)}
                                     project={getSelectedProject()}
                                     addTask={addTask}
                                     removeTask={removeTask}
                                     toggleTaskCompleted={toggleTaskCompleted}
                                     deleteProject={deleteProject}
                                     changeMode={changeMode}
                                     updateProject={updateProject}
                            />
                        }
                    </section>
                </div>
            </main>
        </>
    );
}

export default App;
