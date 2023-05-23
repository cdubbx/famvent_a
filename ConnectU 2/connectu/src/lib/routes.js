import Dashboard from "../component/dashboard";
import { createBrowserRouter } from "react-router-dom";
import Login from "../component/auth/Login";
import Register from "../component/auth/Register";
import Layout from "../layout/index";
import Comments from "../component/comments/index";
import Profile from "../component/profile/index";
export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const PROTECTED = "/protected" // it bring us to a protected page, I probably will not have to do this for a react native app 
export const DASHBOARD = "/protected/dashboard"
export const USERS = "/protected/users" 
export const PROFILE = "/protected/profile/:id" // telling react that we are going to have a dynamic parameter 
export const COMMENTS = "/protected/comments/:id"


export const router = createBrowserRouter([ // going to be a list of all of the different routes 
    {path: ROOT, element: "Public Root"}, // if I ever decide to do this project again I will make this home page
    {path: LOGIN, element: <Login />}, 
    {path: REGISTER, element: <Register/>},
    {
        path: PROTECTED,  // in the protected route 
        element: <Layout />,  // it allows me to say that you need a user logged in to use these feature, if no user then it will redirect to the login so that useAuth is validated 
        children: [ // theres are all of the children the Layout path
        
        
            {
            path: DASHBOARD,
            element: <Dashboard />,
            },
            {
                path: USERS,
                element: "Users",
            },
            {
                path: PROFILE,
                element: <Profile />,
            },
            {
                path: COMMENTS,
                element: <Comments />,
            },
    ]},

])