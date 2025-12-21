import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"

function Modal({ children }) {
    const modalRef = useRef(null)

    if (!modalRef.current) {
        modalRef.current = document.createElement("div")
    }

    useEffect(() => {
        const modalRoot = document.getElementById("portal")
        modalRoot.appendChild(modalRef.current)

        return () => {
            modalRoot.removeChild(modalRef.current)
        }
    }, [])

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-full z-50 backdrop-blur-xl">
            <div className=" p-6 rounded-lg shadow-lg w-full">
                {children}
            </div>
        </div>,
        modalRef.current
    )
}

export default Modal
