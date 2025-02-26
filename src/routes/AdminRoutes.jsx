import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/Admin/AdminPage";



export const AdminRoutes = [
    {
        path : "/admin",
        element: <AdminLayout />,
        children: [
        {
            path:"dashboard",
            element: <AdminPage />
        },
        
        ]
    }
]