import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import UserList from "./components/User_List"
import PasswordSetup from "./components/PasswordSetup"
import ForgotPassword from "./components/Password_Reset"
import NewPassword from "./components/NewPassword"



const router = createBrowserRouter([
    {path: '',element:<App/>},
    {path: '/setpassword',element:<PasswordSetup/>},
    {path: '/passwordreset',element:<ForgotPassword/>},
    {path: '/passwordsetup',element:<NewPassword/>},
    {path: '/login',element:<Login/>},
    {path: '/dashboard',element:<Dashboard/>},
    {path: '/userList',element:<UserList/>},
   
    
])

export default router;