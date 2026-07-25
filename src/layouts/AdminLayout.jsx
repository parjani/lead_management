import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/UserHeader.jsx";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <UserHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;