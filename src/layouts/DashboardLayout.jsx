import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ModeratorDashboard from "../pages/Dashboard/ModeratorDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";

const DashboardLayout = () => {
  //TODO
  const role = "moderator";

  if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "moderator") {
    return <ModeratorDashboard></ModeratorDashboard>;
  } else {
    return <div>Unauthorized Access</div>;
  }
};

export default DashboardLayout;
