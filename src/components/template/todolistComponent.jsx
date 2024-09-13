import  { useState, useEffect } from "react";
import {
    GetAll,
    FilterStatusTodolist,
    UpdateTodolist,
    DeleteTodolistById,
    GetTodolistById,
    CreateTodolist,
    SearchTodolist,
    GetCountByStatus,
    GetCountTodolist,
    SearchAllTodolist
} from "../../api/TodolistApi";

import {
    Typography,
    Checkbox,
} from "@material-tailwind/react";


import { LogoutFloatingButton } from "../UI/logoutFloatingButtonComponent";

import { ModalCreate } from "../UI/createModalComponent";
import { ModalUpdate } from "../UI/updateModalComponent";
import { SearchComponent } from "../UI/searchComponent";
import { FilterStatusComponent } from "../UI/filterStatusComponent";
import { PaginationControlled } from "../UI/paginationComponent";
export function TodolistTemplate() {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(3);
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

    const handleCloseModalUpdate = () => {
        setModalUpdateOpen(false);
    };

    useEffect(() => {
        try {
            if (search === "") {
                if (filtered === "All") fetchAllTasks();
                else if (filtered === "Completed") fetchCompletedTasks();
                else if (filtered === "Uncompleted") fetchUncompletedTasks();
            } else {
                console.log("Masuk sini");
                if (filtered === "All") fetchAllTaskBySearch("All");
                else if (filtered === "Completed") fetchAllTaskBySearch("Completed");
                else if (filtered === "Uncompleted") fetchAllTaskBySearch("Uncompleted");
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log("Tasks : " + tasks);
            setIsLoading(false);
        }
        setRefresh(0);
    }, [filtered, refresh, isLoading, search, page]);

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

            } catch (error) {
                console.log(error);
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
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchAllTaskBySearch = async (status) => {
        try {
            setIsLoading(true);
            let datas = {};
            if(status == "All"){
                datas = await SearchAllTodolist({task: search });
                
            }else{
                datas = await SearchTodolist({ status: status, task: search });
            }
            setTasks(datas);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchAllTasks = async () => {
        try {
            setIsLoading(true);
            const data = await GetAll(page);
            setTasks(data);
            getCountTask("All");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCompletedTasks = async () => {
        try {
            setIsLoading(true);
            const data = await FilterStatusTodolist("Completed", page);
            setTasks(data);
            getCountTask("Completed");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUncompletedTasks = async () => {
        try {
            setIsLoading(true);
            console.log("Page" + page);
            const data = await FilterStatusTodolist("Uncompleted", page);
            setTasks(data);
            getCountTask("Uncompleted");
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    };

    const deleteTask = async (id) => {
        try {
            setIsLoading(true);
            const submit = await DeleteTodolistById(id);
            console.log(submit);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCountTask = async (status) => {
        try {
            setIsLoading(true);
            let counts = 0;
            if (status === "All") {
                counts = await GetCountTodolist();
            } else {
                counts = await GetCountByStatus(status);
            }
            counts = counts / 4;
            if (counts % 1 !== 0) {
                setCount(Math.floor(counts) + 1);
            } else {
                setCount(counts);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <>
            <div className="flex flex-wrap justify-between">
                <SearchComponent
                    search={search}
                    onDissmiss={(search) => setSearch(search)}
                />
                <FilterStatusComponent
                    filtered={filtered}
                    onDissmiss={(filtered) => setFiltered(filtered)}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center mt-10">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
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
            <div className="flex justify-center mt-5">
                <PaginationControlled
                    page={page}
                    count={count}
                    onDismiss={(page) => { setPage(page) }}
                />
            </div>


            {modalUpdateOpen && (
                <ModalUpdate
                    defaultData={selectedTaskData}
                    open={modalUpdateOpen}
                    handleOpen={handleCloseModalUpdate}
                    onDissmiss={(task, note) => {
                        setTask(task);
                        setNote(note)
                    }}
                />
            )}
            
            
            <ModalCreate
                onDissmiss={(data) => {
                    console.log(data);
                    createNewTask(data);
                }
                }
            />
            <LogoutFloatingButton />
        </>
    );
}
