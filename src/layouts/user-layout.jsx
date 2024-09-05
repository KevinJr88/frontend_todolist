import { Outlet } from "react-router-dom";



const LayoutUser = ({ children }) => {
    return (
        <div className=" w-full ">
            <div className=" p-3 bg-gray-800 flex justify-between gap-5 ">
                <h1 className="text-white ">Layout User</h1>
                <div className="flex justify-start gap-6">
                    <a href="/histori" className="text-white">Histori Pengiriman</a>
                    <a href="/top" className="text-white">Top Supplier</a>
                    <a href="/register" className="text-white">Page 3</a>
                    <a href="/register" className="text-white">Page 4</a>
                    <a href="/register" className="text-white">Page 4</a>
                </div>

            </div>
            <div>
                {children ? children : <Outlet />}
            </div>

        </div>
    );
};

export default LayoutUser;