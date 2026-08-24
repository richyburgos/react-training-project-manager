import {useState, useRef} from "react";
import ProjectTasks from "./ProjectTasks.jsx";
import Button from "./common/Button.jsx";
import Modal from "./common/Modal.jsx";
import ProjectForm from "./ProjectForm.jsx";

export default function Project({ project,
                                  addTask,
                                  changeMode,
                                  showSuccessToast,
                                  removeTask,
                                  toggleTaskCompleted,
                                  updateProject,
                                  deleteProject })
{
    const editDialogRef = useRef(null);
    const deleteDialogRef = useRef(null);
    const taskInputRef = useRef();

    const [activeModal, setActiveModal] = useState(null);

    const handleAddTask = () => {
        const unixTimeSec = Math.floor(Date.now() / 1000);

        const newTask = {
            id: unixTimeSec,
            description: taskInputRef.current.value.trim(),
            completed: false
        };

        addTask(project.id, newTask);
        taskInputRef.current.value = "";
    }

    const handleDeleteProject = () => {
        changeMode("init");
        deleteProject(project.id);
    };

    const openDeleteModal = () => {
        setActiveModal("delete");
        document.body.style.overflow = "hidden";
        setTimeout(() => deleteDialogRef.current?.focus(), 0);
    };

    const openEditModal = () => {
        setActiveModal("edit");
        document.body.style.overflow = "hidden";
        setTimeout(() => editDialogRef.current?.focus(), 0);
    };

    const closeModal = () => {
        setActiveModal(null);
        document.body.style.overflow = "";
    };

    return <>
        <Modal isOpen={activeModal ==="edit"}
               onClose={closeModal}
               dialogRef={editDialogRef}
               title=""
               confirmationButtons={false}
               body={ <ProjectForm mode="edit"
                                   type="modal"
                                   onCancel={closeModal}
                                   showSuccessToast={showSuccessToast}
                                   project={project}
                                   updateProject={updateProject}
                      />
               }
        />

        <Modal isOpen={activeModal ==="delete"}
               onClose={closeModal}
               dialogRef={deleteDialogRef}
               title="Delete Project"
               body="Are you sure you want to delete this project? This action cannot be undone."
               confirmAction={handleDeleteProject}
        />

        <section className="px-4 md:px-8 mt-6 flex flex-col gap-4">
            <div className="relative rounded-lg border border-slate-100 bg-white p-6 shadow-sm">

                {/* FIRST DIV: Main text content area */}
                {/* "pr-36" creates a permanent right-side buffer zone to prevent text clipping */}
                <div className="pr-36">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        {project.title}
                    </h2>

                    <p className="text-base font-medium text-slate-600">
                        Due Date: {project.dueDate}
                    </p>

                    <p className="mt-4 text-base font-medium text-slate-800">
                        {project.description}
                    </p>
                </div>

                {/* SECOND DIV: Action buttons area */}
                {/* "absolute top-6 right-6" forces it to the top-right corner */}
                {/* Removed "mt-6" and used "flex gap-2" to align buttons horizontally */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                    <Button action={() => changeMode("init")}
                            color="dark"
                            label="Cancel"
                    />
                    <Button action={openEditModal}
                            color="green"
                            label="Edit"
                    />
                    <Button action={openDeleteModal}
                            color="red"
                            label="Delete"
                    />
                </div>

                {/* THIRD DIV: Your body content section */}
                {/* "mt-6" pushes it cleanly down below the title/date line */}
                {/* Does NOT need "pr-36" because it sits safely underneath the buttons */}
                <div className="mt-6 border-t border-slate-100 pt-4 text-base text-slate-700 leading-relaxed">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Tasks
                    </h2>
                    <form className="flex items-center gap-2.5" onSubmit={handleAddTask}>
                        {/* Input automatically stretches because of "w-full" combined with flex layout */}
                        <input ref={taskInputRef}
                               required
                               type="text"
                               placeholder="Enter a new task..."
                               className="px-3 py-2 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 border border-slate-300"
                        />

                        {/* Button stays firmly on the right side */}
                        {/* Fixed a minor typo in your text color class from text-slate-5000 to text-slate-600 */}
                        {/* Changed border to border-slate-200 to give the button a clean outline matching the input */}
                        <Button type="submit"
                                color="ghost"
                                noWrap
                                label="Add Task"
                        />
                    </form>
                    <ProjectTasks toggleTaskCompleted={(taskId) => toggleTaskCompleted(project.id, taskId)}
                                  tasks={project.tasks}
                                  removeTask={(taskId) => removeTask(project.id, taskId)}
                    />
                </div>
            </div>
        </section>
    </>;
}
