import { NavLink, Outlet } from "react-router-dom";
import { FaChartLine, FaUsers, FaTicketAlt, FaHome } from "react-icons/fa";

const AdminDashboard = () => {
  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
        : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
    }`;

  return (
    <div className="flex">
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 p-6 min-h-screen border-r border-slate-700/50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mt-2"></div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <NavLink to="statisticsPage" className={navLinkStyles}>
                <FaChartLine className="text-lg" />
                <span>Statistics</span>
              </NavLink>
            </li>
            {/* Fixed the typo in NavLink "to" prop */}
            <li>
              <NavLink to="manageUsers" className={navLinkStyles}>
                <FaUsers className="text-lg" />
                <span>Manage Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="manageCoupons" className={navLinkStyles}>
                <FaTicketAlt className="text-lg" />
                <span>Manage Coupons</span>
              </NavLink>
            </li>

            <div className="my-6 border-t border-slate-700/50" />

            <li>
              <NavLink to="/" className={navLinkStyles}>
                <FaHome className="text-lg" />
                <span>Back to Home</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-6">
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 mb-3">
              <FaUsers className="text-white text-xl" />
            </div>
            <h3 className="text-white font-medium mb-1">Admin Portal</h3>
            <p className="text-slate-400 text-sm">
              Manage your system efficiently
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
