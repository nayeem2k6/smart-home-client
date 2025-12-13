import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/Layouts/MainLayout";
import ErrorPage from '../Pages/ErrorPage'
import Register from "../Pages/Register";

import Login from '../Pages/Login'
import Home from "../Pages/Home";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoleDashboard from "../Pages/AdminRoleDashboard";
import MyProfile from "../Pages/MyProfile";
import ServicesPage from "../Components/services/ServicesPage";
import ServiceDetails from "../Components/services/ServicesDetails";
import MyBookings from "../Components/MyBookings";
import AdminServices from "../Components/services/AdminServices";

  const router = createBrowserRouter([

    {
        path:'/',
        Component:MainLayout,
        errorElement: <ErrorPage />,
        children: [
            {
               index:true,
               Component:Home
            },
            {
                path:'/register',
                Component:Register,
            },
            {
                path:'/login',
                Component:Login,
            },
            {
                path:'/services',
                Component:ServicesPage
            },
            {
                path:'/services/:id',
                element:<ServiceDetails></ServiceDetails>
            }
         
        ]
        
    },
    {
        path:'/dashboard',
        element:<PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path:'/dashboard/users',
                element:
                    <AdminRoleDashboard></AdminRoleDashboard>
                
            },
            {
                path:'/dashboard/profile',
                element:<MyProfile></MyProfile>
            },
            {
                path:'/dashboard/bookings',
                element:<MyBookings></MyBookings>
            },
            {
                path:'/dashboard/services',
                element:<AdminServices></AdminServices>
            }
           
        ]
        
    }
])
export default router;