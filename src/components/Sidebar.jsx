import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiActivity,
  FiUser,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { getToken, clearAuth, getUser } from "../utils/token";
import { toast } from "react-toastify";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = getUser();
  // Change this later from API
  const isAdmin = (user?.role === "admin") ? true : false;

  const adminMenus = [
    {
      name: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Leads",
      icon: <FiUsers size={20} />,
      path: "/admin/leads",
    },
    {
      name: "Members",
      icon: <FiUserCheck size={20} />,
      path: "/admin/members",
    },
    {
      name: "Activity",
      icon: <FiActivity size={20} />,
      path: "/admin/activity",
    },
    {
      name: "Profile",
      icon: <FiUser size={20} />,
      path: "/admin/profile",
    },
  ];

  const memberMenus = [
    {
      name: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/member/dashboard",
    },
    {
      name: "My Leads",
      icon: <FiUsers size={20} />,
      path: "/member/leads",
    },
    {
      name: "Activity",
      icon: <FiActivity size={20} />,
      path: "/member/activity",
    },
    {
      name: "Profile",
      icon: <FiUser size={20} />,
      path: "/member/profile",
    },
  ];

  const menus = isAdmin ? adminMenus : memberMenus;

  const handleLogout = async () => {

    try {

      const token = getToken();

      await logout(token);

      clearAuth();

      toast.success("Logged out successfully.");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Logout failed."
      );

    }

  };

  return (
    <aside
      className={`${collapsed ? "w-20" : "w-64"
        } h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}

      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-2xl font-bold text-blue-600">
            LeadFlow
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Menu */}

      <div className="flex-1 px-3 py-5 space-y-2">

        {menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200

              ${isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            {menu.icon}

            {!collapsed && (
              <span className="font-medium">
                {menu.name}
              </span>
            )}

          </NavLink>

        ))}

      </div>

      {/* Logout */}

      <div className="p-3 border-t border-gray-200">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer"
        >
          <FiLogOut size={20} />

          {!collapsed && (
            <span>Logout</span>
          )}

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;