import React, { useState } from "react";

import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button
} from "@material-tailwind/react";


export function ModalCreate({onDissmiss }) {
    const [open, setOpen] = React.useState(false);
    const [task, setTask] = useState("");
    const [note, setNote] = useState("");
    

    const handleTaskChange = (e) => setTask(e.target.value);
    const handleNoteChange = (e) => setNote(e.target.value);

    const handleOpen = () => setOpen(!open);
    const handleConfirm = () => {
        const data = {
            task: task,
            note: note,
            status: "Uncompleted"
        }
        setTask(null);
        setNote(null);
        handleOpen();
        onDissmiss(data);
    };

    return (
        <div>
            <button
                onClick={handleOpen}
                className="fixed bottom-8 right-8 bg-[#7c3aed] text-white rounded-full p-4 shadow-lg hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>

            <Dialog className="px-6" open={open} handler={handleOpen} >
                <DialogHeader className="font-bold text-[24px] m-3 ">What to do?</DialogHeader>
                <DialogBody className="m-3">
                    <label htmlFor="" className="font-semibold text-black">New Task</label>
                    <input
                        type="text"
                        className="w-full mt-2 p-2 mb-4 pr-10 border-[2px] border-[#7c3aed] rounded-md"
                        placeholder="Menggambar"
                        value={task}
                        onChange={handleTaskChange}
                    />

                    <label htmlFor="" className=" font-semibold text-black">Note</label>
                    <input
                        type="text"
                        className="w-full mt-2 p-2 pr-10 border-[2px] border-[#7c3aed] rounded-md"
                        placeholder="Saya suka sekali menggambar..."
                        value={note}
                        onChange={handleNoteChange}
                    />
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
                    <Button variant="gradient" color="green" onClick={handleConfirm}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );


}