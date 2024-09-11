import useAxios from ".";

export const GetAll = async (offset) => {
    try {
        console.log(offset);
        const response = await useAxios.get(`/todolist/${offset-1}/4`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data.response.content);
        return response.data.response.content;
    } catch (error) {
        throw error.response.data.data;
    }
};


export const GetTodolistById = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/todolist/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const CreateTodolist = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.post("/todolist", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const UpdateTodolist = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/todolist/${data.id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const DeleteTodolistById = async (id) => {
    console.log(id);
    try {
        
        const response = await useAxios.delete(`/todolist/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const SearchTodolist = async (data) => {
    try {
        const response = await useAxios.post("/todolist/search", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const FilterStatusTodolist = async (status, offset) => {
    try {
        console.log("Masuk sini")
        console.log(status);
        console.log(offset);
        const response = await useAxios.get(`/todolist/${status}/${offset-1}/4`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data.response.content);
        return response.data.response.content;
    } catch (error) {
        throw error.response.data.response.content;
    }
};

export const GetCountByStatus = async (status) => {
    try {
        const response = await useAxios.get(`/todolist/count/${status}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data.data;
    }
};

export const GetCountTodolist = async () => {
    try {
        const response = await useAxios.get(`/todolist/count`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data.data;
    }
};

export const LoginUser = async (data) => {
    try {
        const response = await useAxios.post("/login", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};





