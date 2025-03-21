import CommentApproval from "../components/Admin/CommentApproval";
import NotificationsPage from "../components/Admin/NotificationsPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/Admin/AdminPage";

export const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminPage />,
      },
      {
        path: "comments/approve/:id",
        element: <CommentApproval />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
    ],
  },
];
