// import LayoutUser from "../layouts/user-layout";
import { Todolist  } from "../pages/to-do-list";


// import { Alamat } from "../pages/alamat/alamat";
// import { AddAlamat } from "../pages/alamat/create/addAlamat";
// import { EditAlamat } from "../pages/alamat/update/editAlamat";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const routes = [
    //default routes
    {
        path: "*",
        element: <div>Routes Not Found!</div>,
    },
    {
        path: "/",
        element: <Todolist/>,
    },

];

const router = createBrowserRouter(routes);

// Komponen AppRouter
const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;