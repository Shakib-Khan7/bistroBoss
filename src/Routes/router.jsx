import {
    createBrowserRouter,
    
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/shared/secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/dashboard/Cart/Cart";
import Allusers from "../pages/dashboard/Cart/AllUsers/Allusers";
import AddItems from "../pages/dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/dashboard/MangeItems/ManageItems";
import UpdateItem from "../pages/dashboard/UpdateItem/UpdateItem";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children :[
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path : 'menu',
                element : <Menu></Menu>
            },
            {
                path : 'order/:category',
                element : <Order></Order>
            },
            {
                path : 'login',
                element : <Login></Login>
            },
            {
                path : 'signup',
                element : <SignUp></SignUp>
            },
            {
                path : 'secret',
                element : <PrivateRoute><Secret></Secret></PrivateRoute>
            }
        ]
    },

    {
        path : '/dashboard',
        element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children : [
            //normal users route
            {
                path : 'cart',
                element : <Cart></Cart>
            },

            //admin routes
            {
                path : 'addItems',
                element : <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path : 'manageItems',
                element : <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },

            {
                path : 'users',
                element : <AdminRoute><Allusers></Allusers></AdminRoute>
            }
            ,
            {
                path : 'updateItem/:id',
                element : <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader : ({params})=> fetch(`http://localhost:5000/menu/${params.id}`)
            }
        ]
    }
]);