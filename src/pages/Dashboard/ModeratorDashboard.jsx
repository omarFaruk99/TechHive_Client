import { NavLink, Outlet } from "react-router-dom";
import { FaClipboardList, FaFlag, FaHome } from "react-icons/fa";

const ModeratorDashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 text-white bg-gradient-to-b from-gray-800 to-gray-700 p-6 min-h-screen shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-white border-b border-gray-600 pb-4">
          Moderator Panel
        </h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="productRevieQueue"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-accent text-white"
                    : "hover:bg-gray-600 text-gray-300"
                }`
              }
            >
              <FaClipboardList className="text-xl" />
              <span>Review Queue</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reportedContent"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-accent text-white"
                    : "hover:bg-gray-600 text-gray-300"
                }`
              }
            >
              <FaFlag className="text-xl" />
              <span>Reported Content</span>
            </NavLink>
          </li>
          <div className="border-t border-gray-600 my-6"></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-600 text-gray-300"
                }`
              }
            >
              <FaHome className="text-xl" />
              <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, Moderator
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your moderation tasks and review content
            </p>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
