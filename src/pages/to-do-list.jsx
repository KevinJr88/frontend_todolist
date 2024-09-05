import React, { useState, useEffect } from "react";
import {
    GetAll,
    FilterStatusTodolist,
    UpdateTodolist,
    DeleteTodolistById,
    GetTodolistById,
    CreateTodolist,
} from "../api/TodolistApi";

import {
    Typography,
    Checkbox,
} from "@material-tailwind/react";

import { ModalCreate } from "../components/create-modal";
import { ModalUpdate } from "../components/update-modal";

export function Todolist() {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState("All");
    const [refresh, setRefresh] = useState(0);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedTaskData, setSelectedTaskData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [task, setTask] = useState("");
    const [note, setNote] = useState("");

    const filter = ["All", "Completed", "Uncompleted"];

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleFilterChange = (event) => {
        setFiltered(event.target.value);
    };

    const handleCloseModalUpdate = () => {
        setModalUpdateOpen(false);
    };

    useEffect(() => {
        try {
            setIsLoading(true);
            if (filtered === "All") fetchAllTasks();
            else if (filtered === "Completed") fetchCompletedTasks();
            else if (filtered === "Uncompleted") fetchUncompletedTasks();
        } finally {
            setIsLoading(false);
        }
        setRefresh(0);
    }, [filtered, refresh, isLoading]);

    useEffect(() => {
        if (task !== "" && note !== "") {
            try {
                setIsLoading(true);
                const data = {
                    id: selectedTaskId,
                    task: task,
                    note: note,
                    status: selectedTaskData.status
                };
                UpdateTodolist(data);
                setTask("");
                setNote("");
                setModalUpdateOpen(false);

            } finally {
                setIsLoading(false);
                setRefresh(1);
            }
        }

    }, [task, note]);

    const createNewTask = async (data) => {
        try {
            setIsLoading(true);
            console.log("masuk sini");
            const submit = await CreateTodolist(data);
            console.log(submit);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchAllTasks = async () => {
        try {
            setIsLoading(true);
            const data = await GetAll();
            setTasks(data);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCompletedTasks = async () => {
        try {
            setIsLoading(true);
            const data = await FilterStatusTodolist({ status: "Completed" });
            setTasks(data);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUncompletedTasks = async () => {
        try {
            setIsLoading(true);
            const data = await FilterStatusTodolist({ status: "Uncompleted" });
            setTasks(data);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (id) => {
        try {
            setIsLoading(true);
            const data = await GetTodolistById(id);
            setModalUpdateOpen(true)
            setSelectedTaskId(id);
            setSelectedTaskData(data);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = (item) => {
        try {
            setIsLoading(true);
            let updateStatus = "";
            item.status === "Uncompleted" ? updateStatus = "Completed" : updateStatus = "Uncompleted";
            updateStatusTask(item, updateStatus);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatusTask = async (item, updateStatus) => {
        try {
            setIsLoading(true);
            const submit = await UpdateTodolist({ id: item.id, status: updateStatus, task: item.task, note: item.note });
            console.log(submit);
            setRefresh(1);
        } finally {
            setIsLoading(false);
        }

    };

    const deleteTask = async (id) => {
        try {
            setIsLoading(true);
            console.log("Masuk sini!");
            const submit = await DeleteTodolistById(id);
            console.log(submit);
            setRefresh(1);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-[90vw] md:w-[60vw] p-8">
                <Typography variant="h1" className="text-[30px] font-bold text-center">SIMPLE TO DO LIST</Typography>
                <div className="flex flex-wrap justify-between">
                    <div className="relative mt-7 w-[70%]">
                        <input
                            type="text"
                            className="w-full px-3 p-2 pr-10 border-[2px] border-[#7c3aed] rounded-md"
                            placeholder="Search task..."
                            onChange={handleSearch}
                            value={search}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                    </div>
                    <select
                        id="year"
                        name="year"
                        className="px-4 w-[24%] h-[45px] font-semibold text-white bg-[#7c3aed] mt-7 py-2 border rounded-md"
                        onChange={handleFilterChange}
                        value={filtered}
                    >
                        {filter.map((filters) => (
                            <option key={filters} className="bg-white text-black font-semibold" value={filters}>{filters}</option>
                        ))}
                    </select>
                </div>

                {isLoading ? (
                    <span className="first-letter:">Loading...</span> // Placeholder loader
                ) : (
                    <>
                        {tasks.map((item) => (
                            <div key={item.id} className="flex justify-start mt-6 px-5 p-4 gap-3 border-b-2 border-[#dac4ff]">
                                <Checkbox
                                    checked={item.status === "Completed"}
                                    onChange={() => handleCheckboxChange(item)}
                                    ripple={false}
                                    className="w-6 h-6 border-[#7c3aed] text-white bg-white checked:bg-[#7c3aed] checked:border-[#7c3aed] checked:text-white"
                                />
                                <div className="flex justify-between w-full">
                                    <div className={item.status === "Completed" ? "line-through" : ""}>
                                        <Typography variant="h3" className="text-[20px] w-full font-bold ">{item.task}</Typography>
                                        <Typography variant="h5" className="text-[14px] w-full font-medium">{item.note}</Typography>
                                    </div>
                                    <div className="min-w-[85px]">
                                        <button className="p-2 rounded-md" onClick={() => handleUpdate(item.id)} >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button className="text-[#f31a1a] p-2 rounded-md" onClick={() => deleteTask(item.id)} >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </>
                )}
            </div>
            {modalUpdateOpen && (
                <ModalUpdate
                    defaultData={selectedTaskData}
                    open={modalUpdateOpen}
                    handleOpen={handleCloseModalUpdate}
                    onDissmiss={(task, note) => { setTask(task); setNote(note) }}

                />
            )}
            <ModalCreate
                onDissmiss={(data) => {
                    console.log(data); 
                    createNewTask(data);} 
                }
            />
        </div>
    );
}
