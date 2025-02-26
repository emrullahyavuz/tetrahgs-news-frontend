import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "./pages/Page404";
import { MainRoutes } from "./routes/routes";
import { AuthRoutes } from "./routes/routes";
import toast, { Toaster } from 'react-hot-toast';
import "./App.css";

const router = createBrowserRouter([
  ...MainRoutes,
  ...AuthRoutes,
  {
    path: "*",
    element: <Page404 />,
  },
]);

const App = () => {
  return (
    <div className="App">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;