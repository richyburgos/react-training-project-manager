import {useRef, useEffect} from "react";
import LabeledInput from "./common/LabeledInput.jsx";
import Button from "./common/Button.jsx";

export default function ProjectForm({ mode = "create",
                                      type = 'view',
                                      onCancel,
                                      showSuccessToast,
                                      addProject,
                                      updateProject,
                                      project })
{
    const titleRef = useRef();
    const descRef = useRef();
    const dueDateRef = useRef();

    useEffect(() => {
        if (mode === "edit" && project) {
            titleRef.current.value = project.title;
            descRef.current.value = project.description;
            dueDateRef.current.value = project.dueDate;
        }
    }, [mode, project]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "edit") {
            updateProject({
                ...project,
                title: titleRef.current.value,
                description: descRef.current.value,
                dueDate: dueDateRef.current.value
            });

            showSuccessToast('Successfully updated project!');
        } else {
            const unixTimeSec = Math.floor(Date.now() / 1000);
            addProject({
                id: unixTimeSec,
                title: titleRef.current.value,
                description: descRef.current.value,
                dueDate: dueDateRef.current.value,
                tasks: []
            });

            titleRef.current.value = '';
            descRef.current.value = '';
            dueDateRef.current.value = '';

            showSuccessToast('Successfully created project!');
            onCancel();
        }
    };

    return (
        <section className="px-4 md:px-8 mt-6" data-theme="light">
            <div className={`text-center max-w-3xl mx-auto ${type === "modal" ? "mb-6 md:mb-8" : "mb-12 md:mb-16"}`}>
                <h2 className="text-3xl font-bold text-slate-900 mb-6 md:text-4xl">
                    {mode === "edit" ? "Edit project" : "Create a new project"}
                </h2>
                <p className="text-base leading-relaxed text-slate-600">
                    {mode === "edit"
                        ? "Update your project details below."
                        : "Create a new project and start collaborating with your team. 🥳"}
                </p>
            </div>

            <div className="items-center gap-12 w-full max-w-6xl mx-auto max-lg:max-w-3xl">
                <form onSubmit={handleSubmit}
                      className="space-y-4 bg-white p-6 rounded-md shadow-xs border border-slate-300"
                >
                    <LabeledInput inputId="title"
                                  placeholder="Title of project"
                                  label="Title"
                                  ref={titleRef}
                    />
                    <LabeledInput inputId="description"
                                  placeholder="Project description"
                                  label="Description"
                                  ref={descRef}
                    />
                    <LabeledInput inputType="date"
                                  inputId="dueDate"
                                  placeholder="Due date"
                                  label="Due Date"
                                  ref={dueDateRef}
                    />

                    <div className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap mt-6">
                        <Button color="blue"
                                type="submit"
                                label="Save"
                        />

                        <Button action={onCancel}
                                color="ghost"
                                label="Cancel"
                        />
                    </div>
                </form>
            </div>
        </section>
    );
}
