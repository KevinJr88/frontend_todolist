import React, { useState, useEffect } from "react";

import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button
} from "@material-tailwind/react";



export const ModalUpdate = ({ defaultData, open, handleOpen, onDissmiss}) => {
    const [task, setTask] = useState(defaultData.task);
    const [note, setNote] = useState(defaultData.note);

    const handleTaskChange = (e) => setTask(e.target.value);
    const handleNoteChange = (e) => setNote(e.target.value);

    
    return (
        <div>
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
                    <Button variant="gradient" color="green" onClick={() => onDissmiss(task, note)}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}