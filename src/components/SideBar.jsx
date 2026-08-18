import {useState, useRef} from "react";
import NoProjects from "../assets/no-projects.png";

export default function SideBar({projects, selectProject,  changeMode}) {
    const handleProjectClick = (projectId) => {
        changeMode('view')
        selectProject(projectId);
    };

    return (
        <aside id="sidebar" className="relative lg:min-w-[264px] w-max max-lg:min-w-8">
            <div id="sidebar-collapse-menu"
                 className="bg-white border-r border-slate-300 w-full fixed left-0 py-6 px-4 overflow-auto h-[100vh] lg:min-w-[264px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500 dark:bg-neutral-900 dark:border-neutral-700">
                <nav aria-label="Primary sidebar navigation">
                    <ul className="space-y-1 text-sm text-slate-800 dark:text-slate-400 font-medium">
                        <li>
                            <button onClick={() => changeMode('init')}
                                    type="button"
                                    className="flex items-center gap-2.5 hover:text-slate-900 hover:bg-slate-100 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-slate-50 dark:hover:bg-neutral-800">
                                <img src={NoProjects} alt="logo"
                                     className="size-[18px] fill-current gap-2.5 dark:brightness-100"/>
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button onClick={()=> changeMode('create')}
                                    type="button"
                                    className="px-3.5 py-2 text-slate-900 dark:text-slate-50 text-sm font-semibold rounded-md cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-neutral-700 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                + Add Project
                            </button>
                        </li>
                    </ul>

                    <div className="mt-6">
                        <div className="text-blue-700 text-sm font-semibold px-3 dark:text-slate-50">
                            Your Projects
                        </div>

                        <ul className="mt-3 space-y-1 text-sm text-slate-800 dark:text-slate-400 font-medium">
                            { projects.length > 0 && projects.map(project => (
                                <li key={project.id}
                                    onClick={() => handleProjectClick(project.id)}
                                    className="cursor-pointer flex items-center gap-2.5 hover:text-slate-900 hover:bg-slate-100 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-slate-50 dark:hover:bg-neutral-800">
                                    {project.title}
                                </li>))
                            }
                            { projects.length === 0 && (
                                <li className="cursor-pointer flex items-center gap-2.5 hover:text-slate-900 hover:bg-slate-100 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-slate-50 dark:hover:bg-neutral-800">
                                    No projects created yet
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
}
