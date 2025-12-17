import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Register from "../Pages/Register";

import Login from "../Pages/Login";
import Home from "../Pages/Home";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoleDashboard from "../Pages/AdminRoleDashboard";
import MyProfile from "../Pages/MyProfile";
import ServicesPage from "../Components/services/ServicesPage";
import ServiceDetails from "../Components/services/ServicesDetails";
import MyBookings from "../Components/MyBookings";
import AdminServices from "../Components/services/AdminServices";
import PaymentSuccess from "../Components/services/PaymentSuccess";
import AdminManageBookings from "../Components/services/AdminManageBookings";
import AssignedProject from "../Components/services/AssignedProject";
import UpdateStatus from "../Components/services/UpdateStatus";
import TodayShedul from "../Components/services/TodayShedul";
import Earning from "../Components/services/Earning";

import { BookingsHistogram } from "../Components/AdminMake/BookingsHistogram";
import PaymentHistory from "../Components/AdminMake/PaymentHistory";
import About from "../Components/menu/About";
import Cot from "../Components/menu/cot";
import DecoratorApproval from "../Components/AdminMake/DecoratorApproval";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/services",
        Component: ServicesPage,
      },
      {
        path: "/services/:id",
        element: <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
      },
      
      {
        path:"/about",
        Component:About
      },
      {
        path:"/contact",
        element:<Cot></Cot>
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/users",
        element: <AdminRoleDashboard></AdminRoleDashboard>,
      },
      {
        path: "/dashboard/profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/bookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "/dashboard/services",
        element: <AdminServices></AdminServices>,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path:"/dashboard/bookings/manage",
        element:<AdminManageBookings></AdminManageBookings>
      },
      {
        path:'/dashboard/projects',
        element:<AssignedProject></AssignedProject>
      },
      {
        path:'/dashboard/projects/update',
        element:<UpdateStatus></UpdateStatus>
      },
      {
        path:'/dashboard/schedule',
        element:<TodayShedul></TodayShedul>
      },
      {
        path:"/dashboard/earnings",
        Component:Earning
      },
     
      {
        path:"/dashboard/decorators/approval",
        element:<DecoratorApproval></DecoratorApproval>
      },
      {
        path:"/dashboard/analytics/bookings-histogram",
        element:<BookingsHistogram></BookingsHistogram>
      },
      {
        path:"/dashboard/payment-history",
        element:<PaymentHistory></PaymentHistory>
      },
      {
        path:"/dashboard/analytics/bookings-histogram",
        Component:BookingsHistogram
      }
        
    
    ],
  },
]);
export default router;
