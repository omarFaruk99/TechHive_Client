import { NavLink, Outlet } from "react-router-dom";

const ModeratorDashboard = () => {
  return (
    <div className="flex">
      <div className="w-60 text-white bg-gray-700 p-3 min-h-screen ">
        <h2 className="text-accentDark text-lg font-semibold mb-5">
          ModeratorDashboard
        </h2>
        <ul className="space-y-2">
          <li>
            <NavLink to="productRevieQueue">Product Review Queue</NavLink>
          </li>
          <li>
            <NavLink to="reportedContent">Reported Content</NavLink>
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
      <div className="flex-1 bg-zinc-200">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
