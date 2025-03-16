import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true })
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  const success = (message) => showToast(message, "success")
  const error = (message) => showToast(message, "error")
  const warning = (message) => showToast(message, "warning")
  const info = (message) => showToast(message, "info")

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 z-50 rounded-md shadow-lg ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
                ? "bg-red-500 text-white"
                : toast.type === "warning"
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-blue-500 text-white"
          } p-4`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}


// custom hook for ToastContext
export const useToast = () => {
  return useContext(ToastContext)
}

