import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ModeratorDashboard from "../pages/Dashboard/ModeratorDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";

const DashboardLayout = () => {
  //TODO
  const role = "admin";
  return (
    <div>
      {/* <UserDashboard></UserDashboard> */}
      {/* <ModeratorDashboard></ModeratorDashboard> */}
      <AdminDashboard></AdminDashboard>
    </div>
  );
};

export default DashboardLayout;
