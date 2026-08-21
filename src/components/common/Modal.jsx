import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen,
                                onClose,
                                confirmationButtons = true,
                                dialogRef,
                                confirmAction,
                                title="Add Title",
                                body="Add Body" })
{
    const overlayRef = useRef(null);

    // Accessibility: ESC key and Tab Trapping
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            if (e.key === "Escape") onClose();

            if (e.key === "Tab" && dialogRef.current) {
                const focusable = dialogRef.current.querySelectorAll(
                    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose, dialogRef]);

    return createPortal (
        <div
            id="modalOverlay"
            ref={overlayRef}
            onClick={(e) => e.target.id === "modalOverlay" && onClose()}
            className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] ${
                !isOpen ? "hidden" : ""
            }`}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex="-1"
                className="w-full max-w-lg bg-white border border-slate-100 shadow-lg rounded-lg relative max-h-[95vh] overflow-y-auto outline-none p-4 md:p-6 "
            >
                <div className={`flex items-center border-slate-300 ${title.trim() ? "border-b pb-3" : ""}`}>
                    <h3 id="modal-title" className="text-slate-900 text-lg font-semibold flex-1">
                        {title}
                    </h3>

                    <button
                        type="button"
                        aria-label="Close modal"
                        onClick={onClose}
                        className="ml-auto flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-3 cursor-pointer fill-slate-500 hover:fill-red-600 dark:fill-slate-400 dark:hover:fill-red-500"
                            aria-hidden="true"
                            viewBox="0 0 329.269 329"
                        >
                            <path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" />
                        </svg>
                    </button>
                </div>

                <div className={`${title.trim() ? "my-6" : ""}`}>
                    { typeof body === 'string' && <p className="text-slate-600 text-sm leading-relaxed">
                        {body}
                    </p>
                    }
                    { (React.isValidElement(body)) && body }
                </div>

                { confirmationButtons && <div className="border-t border-slate-300 flex justify-end gap-4 pt-4 md:pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-2 text-slate-900 text-sm font-semibold rounded-md cursor-pointer bg-white border border-slate-300 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-50 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:border-neutral-600"
                    >
                        Cancel
                    </button>
                    <button onClick={confirmAction}
                            type="button"
                            className="px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 border border-blue-600 transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        Accept
                    </button>
                </div> }
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}
