import {useState, useRef} from "react";

export default function Button({ action,
                                 label,
                                 type = 'button',
                                 color = 'blue',
                                 noWrap = false})
{
    const buttonColors = {
        blue: "text-blue-900 border-blue-200 focus-visible:ring-blue-500  bg-blue-100 hover:bg-blue-200",
        ghost: "bg-transparent border-slate-200 hover:bg-slate-50 text-slate-900 focus-visible:ring-blue-500",
        green: "text-slate-900 bg-green-100 hover:bg-green-200 border-green-200 focus-visible:ring-blue-500",
        red: "text-red-900 bg-red-100 hover:bg-red-200 border-red-200 focus-visible:ring-blue-500",
        dark: "text-slate-900 dark:text-slate-50 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-700 dark:hover:bg-neutral-800 border-slate-200 dark:border-neutral-600 focus-visible:ring-blue-500",
    };

    return <button onClick={action}
                   type={type}
                   className={`
                   px-3.5 
                   py-2 
                   text-sm 
                   font-semibold 
                   rounded-md 
                   cursor-pointer 
                   border 
                   transition-colors 
                   focus:outline-none 
                   focus-visible:ring-2 
                   ${buttonColors[color]}
                   ${noWrap ? 'whitespace-nowrap' : ''}
                   `}
    >
        {label}
    </button>;
}
