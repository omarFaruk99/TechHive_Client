//Router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import AddProduct from "../pages/Dashboard/AddProduct";
import MyProduct from "../pages/Dashboard/MyProduct";
import ProductRevieQueue from "../pages/Dashboard/ProductRevieQueue";
import ReportedContent from "../pages/Dashboard/ReportedContent";
import StatisticsPage from "../pages/Dashboard/StatisticsPage";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageCoupons from "../pages/Dashboard/ManageCoupons";
import UpdateProduct from "../pages/Dashboard/UpdateProduct";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import Testimonials from "../pages/Testimonials";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <SignUp></SignUp>,
      },
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "testimonials",
        element: <Testimonials></Testimonials>,
      },
      {
        path: "faq",
        element: <Faq></Faq>,
      },
      {
        path: "product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="myproduct" replace></Navigate>, //default  route
      // },
      // user Routes
      {
        path: "myprofile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "myproduct",
        element: <MyProduct></MyProduct>,
      },
      // Moderator routes
      {
        path: "productRevieQueue",
        element: <ProductRevieQueue></ProductRevieQueue>,
      },
      {
        path: "reportedContent",
        element: <ReportedContent></ReportedContent>,
      },
      // Admin routes
      {
        path: "statisticsPage",
        element: <StatisticsPage></StatisticsPage>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manageCoupons",
        element: <ManageCoupons></ManageCoupons>,
      },
      {
        path: "updateProduct/:id",
        element: <UpdateProduct></UpdateProduct>,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://tech-hive-server-mu.vercel.app/products/${params.id}`
          );
          const data = await response.json();
          return data;
        },
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
