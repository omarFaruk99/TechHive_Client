import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="w-52 text-white bg-gray-700 p-3 min-h-screen ">
        <h2 className="text-accentDark text-lg font-semibold mb-5">
          Admin Dashboard
        </h2>
        <ul className="space-y-2">
          <li>
            <NavLink to="statisticsPage">Statistics Page</NavLink>
          </li>
          <li>
            <NavLink to="manageUsers">Manage Users</NavLink>
          </li>
          <li>
            <NavLink to="manageCoupons">Manage Coupons</NavLink>
          </li>
          {/* border/divider */}
          <div>
            <div className="border border-zinc-200 my-5"></div>
          </div>
          <li></li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminDashboard;
