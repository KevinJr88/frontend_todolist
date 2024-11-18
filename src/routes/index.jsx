import { Todolist } from "../pages/to-do-list";
import { Login } from "../pages/login.jsx";
import { Register } from "../pages/register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



const routes = [
    {
        path: "*",
        element: <div>Routes Not Found!</div>,
    },
    {
        path: "/",
        element: (
            <Todolist />
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
];

const router = createBrowserRouter(routes);

const AppRouter = () => {
    return (
            <RouterProvider router={router} />
    );
};

export default AppRouter;
