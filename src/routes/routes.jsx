import { createBrowserRouter } from "react-router-dom";
import Page404 from "../pages/Page404";
import { MainRoutes } from "./MainRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";


const router = createBrowserRouter([
    ...MainRoutes,
    ...AuthRoutes,
    ...AdminRoutes,
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

export default router;