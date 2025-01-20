import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
  const { user } = useAuth();
  return (
    <div>
      {user?.email ? (
        <p className="flex justify-center font-semibold text-blue-600">
          {user.email}
        </p>
      ) : (
        ""
      )}
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-288px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
