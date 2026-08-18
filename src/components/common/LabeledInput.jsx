import {forwardRef} from "react";

const LabeledInput= forwardRef(({inputType = "text", inputId, placeholder, label}, ref) => {
    return <div>
        <label htmlFor={inputId}
               className="mb-2 text-slate-900 font-medium text-sm inline-block"
        >
            {label}
        </label>
        <input type={inputType}
               ref={ref}
               required
               id={inputId}
               name={inputId}
               placeholder={placeholder}
               className="px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 border border-slate-300"
        />
    </div>;
});

export default LabeledInput;
