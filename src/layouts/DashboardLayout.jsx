// DashboardLayout.jsx

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ModeratorDashboard from "../pages/Dashboard/ModeratorDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (user?.email) {
          const response = await axiosSecure.get(`/users/role/${user.email}`);
          setRole(response.data.role);
        }
      } catch (error) {
        // console.error("Error fetching user role:", error);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, [user, axiosSecure]);

  // Show loading state while checking authentication and role
  if (loading || roleLoading) {
    return (
      <div>
        {" "}
        <LoadingSpinner></LoadingSpinner>{" "}
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render appropriate dashboard based on role
  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "moderator") {
    return <ModeratorDashboard />;
  } else if (role === "user") {
    return <UserDashboard />;
  }

  // Fallback for unknown roles
  return <div>Unauthorized Access</div>;
};

export default DashboardLayout;
