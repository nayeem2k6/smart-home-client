import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/Layouts/MainLayout";
import ErrorPage from '../Pages/ErrorPage'
import Register from "../Pages/Register";

import Login from '../Pages/Login'
import Home from "../Pages/Home";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoleDashboard from "../Pages/AdminRoleDashboard";
import AdminRoute from "./AdminRoute";

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
                
            }
        ]
        
    }
])
export default router;