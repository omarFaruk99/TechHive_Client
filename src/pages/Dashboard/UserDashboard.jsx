import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="w-52 text-white bg-gray-700 p-3 min-h-screen ">
        <h2 className="text-accentDark text-lg font-semibold mb-5">
          UserDashboard
        </h2>
        <ul className="space-y-2">
          <li>
            <NavLink to="myprofile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="addproduct">Add Products</NavLink>
          </li>
          <li>
            <NavLink to="myproduct">My Products</NavLink>
          </li>
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

export default UserDashboard;
