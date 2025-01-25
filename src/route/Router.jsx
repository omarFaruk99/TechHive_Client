import { createBrowserRouter } from "react-router-dom";
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
        path: "product/:id",
        element: <ProductDetails></ProductDetails>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
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
      {
        path: "productRevieQueue",
        element: <ProductRevieQueue></ProductRevieQueue>,
      },
      {
        path: "reportedContent",
        element: <ReportedContent></ReportedContent>,
      },
      {
        path: "statisticsPage",
        element: <StatisticsPage></StatisticsPage>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "updateProduct/:id",
        element: <UpdateProduct></UpdateProduct>,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/products/${params.id}`
          );
          const data = await response.json();
          return data;
        },
      },
      {
        path: "manageCoupons",
        element: <ManageCoupons></ManageCoupons>,
      },
    ],
  },
]);

export default router;
