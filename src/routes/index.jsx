import { Todolist } from "../pages/to-do-list";
import { Login } from "../pages/login.jsx";
import { Register } from "../pages/register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from '../routes/ProtectedRoute.jsx';


const routes = [
    {
        path: "*",
        element: <div>Routes Not Found!</div>,
    },
    {
        path: "/frontend_todolist",
        element: (
            <ProtectedRoute>
                <Todolist />
            </ProtectedRoute>
        ),
    },
    {
        path: "/frontend_todolist/login",
        element: <Login />,
    },
    {
        path: "/frontend_todolist/register",
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
