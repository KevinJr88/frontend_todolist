import React, { useState } from "react";
import { CgLogOut } from "react-icons/cg";

import {
    Dialog,
    DialogBody,
    DialogFooter,
    Button
} from "@material-tailwind/react";


export function LogoutFloatingButton() {
    const [open, setOpen] = useState("");
    
    const handleOpen = () => setOpen(!open);
    const handleConfirm = () => {
        window.localStorage.removeItem("isAuthenticated");
        window.location.href = "/frontend_todolist/#/login";
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="fixed bottom-8 left-8 bg-[#dc2626] text-white rounded-full p-3 shadow-lg hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
                <CgLogOut className="text-[23px] m-1 " />
            </button>

            <Dialog className="px-6 " open={open} handler={handleOpen} >
                
                <DialogBody className="m-3 font-bold text-[24px]">
                    Logout?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleConfirm}>
                        <span>Yes</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );


}