import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { CommentProvider } from "./context/CommentContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CommentProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </CommentProvider>
  </AuthProvider>
);
