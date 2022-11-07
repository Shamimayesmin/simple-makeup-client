import { createBrowserRouter } from "react-router-dom";
import CheckOut from "../components/CheckOut/CheckOut";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Login from "../components/Login/Login";

import Home from "../components/pages/Home/Home/Home";
import Orders from "../components/pages/Orders/Orders";

import SignUp from "../components/SignUp/SignUp";

import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',

        element : <Main></Main>,
        errorElement : <ErrorPage></ErrorPage>,
        
        children : [
            {
                path: '/',
                element : <Home></Home>
            },
            {
                path : '/login',
                element : <Login></Login>
            },
            {
                path : '/signup',
                element : <SignUp></SignUp>
            },
            {
                path : '/checkout/:id',
                element : <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                loader : ({params})=>fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path : '/orders',
                element : <PrivateRoute><Orders></Orders></PrivateRoute>
            }

        ]
    }
])

export default router;