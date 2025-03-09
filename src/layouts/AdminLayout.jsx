import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
