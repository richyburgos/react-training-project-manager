import {useState} from "react";
import {createPortal} from "react-dom";

export default function Toast({type = "success", message = "", resetToast }) {
    const [showToast, setShowToast] = useState(true);

    const toastBgColors = {
        success: {
            bg: "bg-green-50 border-green-100 ",
            text: "text-green-900"
        },
        warning: {
            bg: "bg-yellow-50 border-yellow-100",
            text: "text-yellow-900"
        },
        error: {
            bg: "bg-red-50 border-red-100",
            text: "text-red-900"
        },
        info: {
            bg: "bg-blue-50 border-blue-100",
            text: "text-blue-900"
        }
    };

    setTimeout(() => {
        setShowToast(false);
        resetToast();
    }, 3000);

    if(!showToast) {
        return;
    }

    return createPortal(
        <div className={ `text-sm p-4 rounded-md border w-max min-w-xs max-w-sm ${toastBgColors[type].bg}` }
             role="alert"
        >
            <div className={ `flex items-center gap-2.5 font-medium ${ toastBgColors[type].text }` }>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="size-[18px] fill-current overflow-visible"
                     viewBox="0 0 330 330"
                     aria-hidden="true"
                >
                    <path d="M165 0C74.019 0 0 74.019 0 165s74.019 165 165 165 165-74.019 165-165S255.981 0 165 0m0 300c-74.44 0-135-60.561-135-135S90.56 30 165 30s135 60.561 135 135-60.561 135-135 135"
                          data-original="#000000"
                    />
                    <path d="m226.872 106.664-84.854 84.853-38.89-38.891c-5.857-5.857-15.355-5.858-21.213-.001-5.858 5.858-5.858 15.355 0 21.213l49.496 49.498a15 15 0 0 0 10.606 4.394h.001c3.978 0 7.793-1.581 10.606-4.393l95.461-95.459c5.858-5.858 5.858-15.355 0-21.213s-15.355-5.859-21.213-.001"
                          data-original="#000000"
                    />
                </svg>
                <p>{ message }</p>
            </div>
        </div>,
        document.getElementById('toast-root')
    );
}
