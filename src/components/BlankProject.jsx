import {useState, useRef} from "react";
import NoProjects from "../assets/no-projects.png";
import Button from "./common/Button.jsx";

export default function BlankProject({changeMode}) {
    return <section className="px-4 md:px-8 mt-6 items-center justify-center flex flex-col gap-4">
        <img src={NoProjects} alt="logo"
             className="size-[144px] fill-current gap-2.5 dark:brightness-100"/>
        <h2 id="jumbotron-heading-1" className="text-2xl text-slate-900 font-bold md:text-3xl">
            No Project Selected
        </h2>
        <p className="mt-4 text-base text-slate-600 leading-relaxed dark:text-slate-400">
            Select a project or get started with a new one
        </p>

        <Button action={() => changeMode('create')}
                color="dark"
                label="Create new project"
        />
    </section>;
}
