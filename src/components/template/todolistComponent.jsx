import { useState, useEffect } from "react";
import { FaUser } from 'react-icons/fa';
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
    GetAllUserReadAccess,
    GetAllUserEditorAccess,
    GetAllUserReadPermission,
    GetAllUserEditorPermission,
    AddUserReadAccess,
    AddUserReadPermission,
    AddUserEditorAccess,
    AddUserEditorPermission,

    DeleteUserReadAccess,
    DeleteUserReadPermission,
    DeleteUserEditorAccess,
    DeleteUserEditorPermission,

    GetAllTodolist_ReadAccess,
    GetAllTodolist_ReadAccessByStatus,
    GetTodolist_ReadAccessById,
    SearchUserReadAccess,
    SearchUserReadAccessByStatus,
    CreateTodolistUserEditorAccess,
    EditTodolistUserEditorAccess,
    DeleteTodolistUserEditorAccess,
    GetCountReadAccess,
    GetCountUserAccessByStatus
} from "../../api/UsershareApi"

import {
    Typography,
    Checkbox,
    Drawer,
    Button,
    IconButton,
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

    const [isAnotherUser, setIsAnotherUser] = useState(false);
    const [isEditorUser, setIsEditorUser] = useState(true);
    const [openTop, setOpenTop] = useState(false);
    const [user, setUser] = useState(localStorage.getItem("username"));
    const [isUser, setIsUser] = useState("");
    const [userReadAccess, setUserReadAccess] = useState([]);
    const [userEditorAccess, setUserEditorAccess] = useState([]);
    const [userReadPermission, setUserReadPermission] = useState([]);
    const [userEditorPermission, setUserEditorPermission] = useState([]);

    const [email, setEmail] = useState("");

    console.log(email);

    const handleCloseModalUpdate = () => {
        setModalUpdateOpen(false);
    };

    useEffect(() => {
        fetchAllUserReadAccess();
        fetchAllUserEditorAccess();
        fetchAllUserReadPermission();
        fetchAllUserEditorPermission();
    }, [isLoading]);

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
    }, [filtered, refresh, isLoading, search, page, isUser, isAnotherUser]);

    useEffect(() => {
        if (task !== "" && note !== "") {
            try {
                setIsLoading(true);
                if (isAnotherUser) {
                    EditTodolistUserEditorAccess(isUser, selectedTaskId, { task: task, note: note, status: selectedTaskData.status });
                } else {
                    const data = {
                        id: selectedTaskId,
                        task: task,
                        note: note,
                        email: selectedTaskData.email,
                        status: selectedTaskData.status
                    };
                    UpdateTodolist(data);
                }

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
            let submit = null;
            if (isAnotherUser) {
                submit = await CreateTodolistUserEditorAccess(isUser, data);
            } else {
                submit = await CreateTodolist(data);
            }

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
            if (!isAnotherUser) {
                if (status == "All") {
                    datas = await SearchAllTodolist({ task: search, toUsername: isUser });
                } else {
                    datas = await SearchTodolist({ status: status, task: search, toUsername: isUser });
                }
            } else {
                if (status == "All") {
                    datas = await SearchUserReadAccess({ task: search, toUsername: isUser });
                } else {
                    datas = await SearchUserReadAccessByStatus(status, { task: search, toUsername: isUser });
                }
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
            let data = null;
            if (isAnotherUser) {
                data = await GetAllTodolist_ReadAccess(page, { toUsername: isUser });
            } else {
                data = await GetAll(page);
            }
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
            let data = null;
            if (isAnotherUser) {
                data = await GetAllTodolist_ReadAccessByStatus(page, "Completed", { toUsername: isUser });
            } else {
                data = await FilterStatusTodolist("Completed", page);
            }
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
            let data = null;
            if (isAnotherUser) {
                data = await GetAllTodolist_ReadAccessByStatus(page, "Uncompleted", { toUsername: isUser });
            } else {
                data = await FilterStatusTodolist("Uncompleted", page);
            }
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
            let data = null;

            if (isAnotherUser) {
                data = await GetTodolist_ReadAccessById(id, { toUsername: isUser });
            } else {
                data = await GetTodolistById(id);
            }
            setModalUpdateOpen(true);
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
            let submit = null;

            if (isAnotherUser) {
                submit = await EditTodolistUserEditorAccess(isUser, item.id, { status: updateStatus, task: item.task, note: item.note });
            } else {
                submit = await UpdateTodolist({ id: item.id, status: updateStatus, task: item.task, note: item.note, email: item.email });
            }

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
            let submit = null;
            if (isAnotherUser) {
                submit = await DeleteTodolistUserEditorAccess(isUser, id);
            } else {
                submit = await DeleteTodolistById(id);
            }

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
            if (isAnotherUser) {
                if (status === "All") {
                    console.log("Masuk sini");
                    counts = await GetCountReadAccess(isUser);
                } else {
                    console.log("Harusnya")
                    counts = await GetCountUserAccessByStatus(isUser, status);
                }
                counts = counts / 4;
                if (counts % 1 !== 0) {
                    setCount(Math.floor(counts) + 1);
                } else {
                    setCount(counts);
                }
            } else {
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
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    };

    const fetchAllUserReadAccess = async () => {
        try {
            setIsLoading(true);
            const data = await GetAllUserReadAccess();

            setUserReadAccess(data);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchAllUserEditorAccess = async () => {
        try {
            setIsLoading(true);
            const data = await GetAllUserEditorAccess();

            setUserEditorAccess(data);


        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchAllUserReadPermission = async () => {
        try {
            setIsLoading(true);
            const data = await GetAllUserReadPermission();
            if (data.length > 0) {
                setUserReadPermission(data);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchAllUserEditorPermission = async () => {
        try {
            setIsLoading(true);
            const data = await GetAllUserEditorPermission();
            if (data.length > 0) {
                setUserEditorPermission(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const createReadAccess = async () => {
        try {
            setIsLoading(true);
            const access = await AddUserReadAccess({ toUsername: email });
            const permiss = await AddUserReadPermission({ toUsername: email });
            console.log(access + " " + permiss);
            setEmail("");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const createEditorAccess = async () => {
        try {
            setIsLoading(true);
            const access = await AddUserEditorAccess({ toUsername: email });
            const permiss = await AddUserEditorPermission({ toUsername: email });
            console.log(access + " " + permiss);
            setEmail("");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteReadAccess = async (email) => {
        try {
            setIsLoading(true);
            const todo = await DeleteUserReadAccess(email);
            const permiss = await DeleteUserReadPermission(email);
            console.log(todo + " " + permiss);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteEditorAccess = async (email) => {
        try {
            setIsLoading(true);
            const todo = await DeleteUserEditorAccess(email);
            const permiss = await DeleteUserEditorPermission(email);
            console.log(todo + " " + permiss);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUserChange = (e) => {
        setIsUser(e.target.value);


    }

    useEffect(() => {
        if (isUser === "") {
            setIsAnotherUser(false);
        } else if (isUser != user) {
            setIsAnotherUser(true)
        } else {
            setIsAnotherUser(false);
        }

        if (userEditorPermission.includes(isUser)) {
            setIsEditorUser(true);
        } else if (isUser === "") {
            setIsEditorUser(true);
        } else if (isUser === user) {
            setIsEditorUser(true);
        } else {
            setIsEditorUser(false);
        }

    }, [isUser]);

    const openDrawerTop = () => setOpenTop(true);
    const closeDrawerTop = () => setOpenTop(false);

    console.log("Ini isUser    " + isUser);
    console.log("Ini user    " + user);
    console.log(isAnotherUser);

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

                            {isEditorUser && (
                                <Checkbox
                                    checked={item.status === "Completed"}
                                    onChange={() => handleCheckboxChange(item)}
                                    ripple={false}
                                    className="w-6 h-6 border-[#7c3aed] text-white bg-white checked:bg-[#7c3aed] checked:border-[#7c3aed] checked:text-white"
                                />
                            )}

                            <div className="flex justify-between w-full">
                                <div className={item.status === "Completed" ? "line-through" : ""}>
                                    <Typography variant="h3" className="text-[20px] w-full font-bold ">{item.task}</Typography>
                                    <Typography variant="h5" className="text-[14px] w-full font-medium">{item.note}</Typography>
                                </div>
                                <div className="min-w-[85px]">

                                    {isEditorUser && (
                                        <>
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
                                        </>
                                    )}

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

            <button
                onClick={openDrawerTop}
                className="absolute top-4 left-4 "
                style={{ padding: '10px', background: 'transparent', border: 'none' }}
            >
                <FaUser className="border-2 border-[#888888] rounded-full p-2 text-[#888888]" size={40} />
            </button>

            <select
                id="user"
                name="user"
                className="px-4 absolute top-4 left-16 mt-3 w-[15%] h-[35px] font-semibold text-black bg-transparent py-2  rounded-md"
                onChange={handleUserChange}
                value={isUser}
            >
                <option key={user} className="bg-white text-black font-semibold" value={user}>{user}</option>
                {userReadPermission.map((users) => (
                    <option key={users} className="bg-white text-black font-semibold" value={users}>{users}</option>
                ))}
            </select>

            <Drawer
                placement="top"
                open={openTop}
                onClose={closeDrawerTop}
                className="p-4"
            >
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h2" color="blue-gray">
                        Hai {user}!
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawerTop}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <div className="flex gap-12">
                    <div>
                        <Typography variant="h6" color="gray" className="mb-2 font-semibold">
                            Read Access to this Account
                        </Typography>
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center mt-10">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                                </div>
                            ) : (
                                <>
                                    {userReadAccess.map((item) => (
                                        <div className="flex mb-3 gap-2 h-3">
                                            <Typography color="black" className="mb-8 pr-4 font-normal text-black">{item}</Typography>
                                            <div className=" p-2 mt-1 h-full rounded-md hover:bg-gray-200 cursor-pointer" onClick={() => deleteReadAccess(item)} >
                                                <p className="text-[#f31a1a] mt-[-7px] text-[12px]">delete</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )
                        }
                    </div>
                    <div>
                        <Typography variant="h6" color="gray" className="mb-2 font-semibold">
                            Editor Access to this Account
                        </Typography>
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center mt-10">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                                </div>
                            ) : (
                                <>
                                    {userEditorAccess.map((item) => (
                                        <div className="flex mb-3 gap-2 h-3">
                                            <Typography color="black" className="mb-8 pr-4 text-black font-normal">{item}</Typography>
                                            <div className=" p-2 mt-1 h-full rounded-md hover:bg-gray-200 cursor-pointer" onClick={() => deleteEditorAccess(item)} >
                                                <p className="text-[#f31a1a] mt-[-7px] text-[12px]"> delete </p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )
                        }
                    </div>
                    <div>
                        <Typography variant="h6" color="gray" className="mb-2 font-semibold">
                            Read Access Permission
                        </Typography>
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center mt-10">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                                </div>
                            ) : (
                                <>
                                    {userReadPermission.map((item) => (
                                        <div className="flex mb-3 gap-2 h-3">
                                            <Typography color="gray" className="mb-8 pr-4 font-normal">{item}</Typography>
                                            {/* <div className=" p-2 mt-1 h-full rounded-md hover:bg-gray-200 cursor-pointer" onClick={() => deleteReadPermission(item)} >
                                                <p className="text-[#f31a1a] mt-[-7px] text-[12px]"> delete </p>
                                            </div> */}
                                        </div>
                                    ))}
                                </>
                            )
                        }

                    </div>
                    <div>
                        <Typography variant="h6" color="gray" className="mb-2 font-semibold">
                            Editor Access Permission
                        </Typography>
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center mt-10">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                                </div>
                            ) : (
                                <>
                                    {userEditorPermission.map((item) => (
                                        <div className="flex mb-3 gap-2 h-3">
                                            <Typography color="gray" className="mb-8 pr-4 font-normal">{item}</Typography>
                                            {/* <div className=" p-2 mt-1 h-full rounded-md hover:bg-gray-200 cursor-pointer" onClick={() => deleteEditorPermission(item)} >
                                                <p className="text-[#f31a1a] mt-[-7px] text-[12px]"> delete </p>
                                            </div> */}
                                        </div>
                                    ))}
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="flex gap-2 mt-10">
                    <input
                        type="text"
                        className="w-[40%]  px-3 p-2 pr-10 border-[2px] border-[#7c3aed] rounded-md"
                        placeholder="Add email..."
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Button size="sm" variant="outlined" onClick={createReadAccess}>
                        Share Read Access
                    </Button>
                    <Button size="sm" variant="outlined" onClick={createEditorAccess}>
                        Share Editor Access
                    </Button>
                </div>
            </Drawer>

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

            {isEditorUser && (
                <ModalCreate
                    onDissmiss={(data) => {
                        console.log(data);
                        createNewTask(data);
                    }}
                />
            )}

            <LogoutFloatingButton />
        </>
    );
}
