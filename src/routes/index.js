import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from '../pages/Home'
import ExplorePage from '../pages/ExplorePage'
import DetailPage from '../pages/DetailPage'
import SearchPage from '../pages/SearchPage'
import Login from '../pages/Login'
import Register from "../pages/Register";
import UserInformation from "../pages/UserInformation";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                path: "",
                element: <Home />
            },
            {
                path: ":explore",
                element: <ExplorePage/>
            },
            {
                path: ":explore/:id",
                element: <DetailPage/>
            },
            {
                path: "search",
                element: <SearchPage/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "user-info",
                element: <UserInformation/>
            }
        ]
    }
])
export default router