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

    const appendProject = (project) => {

        setProjects((prevState) => {
            return [...prevState, project];
        });
    };

    const removeProject = (id) => {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    }

    const appendTask = (projectId, newTask) => {
        setProjects(prevProject =>
            prevProject.map(p => {
                // 1. Find the target project by its ID
                if (p.id === projectId) {
                    // 2. Return a new copy of that project object
                    return {
                        ...p,
                        // 3. Create a new array for tasks, copying the old ones and appending the new one
                        tasks: [...p.tasks, newTask]
                    };
                }
                // 4. Leave all other projects completely unchanged
                return p;
            })
        );
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
                                 deleteProject={removeProject}
                                 changeMode={changeMode}
                        />
                    }
                </section>
            </div>
        </main>
);
}

export default App;
