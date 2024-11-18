import useAxios from ".";


export const GetAllUserReadAccess = async () => {
    try {
        
        const response = await useAxios.get(`/share/read/access`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const GetAllUserEditorAccess = async () => {
    try {
        const response = await useAxios.get(`/share/editor/access`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetAllUserReadPermission = async () => {
    try {
        const response = await useAxios.get(`/share/read/permission`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const GetAllUserEditorPermission = async () => {
    try {
        const response = await useAxios.get(`/share/editor/permission`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const AddUserReadAccess = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put("/share/read", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const AddUserReadPermission = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put("/share/read/permission", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const AddUserEditorAccess = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put("/share/editor", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const AddUserEditorPermission = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put("/share/editor/permission", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const DeleteUserReadAccess = async (email) => {
    try {

        const response = await useAxios.delete(`/share/read/delete/${email}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const DeleteUserReadPermission = async (email) => {
    try {

        const response = await useAxios.delete(`/share/read/permission/delete/${email}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const DeleteUserEditorAccess = async (email) => {
    try {

        const response = await useAxios.delete(`/share/editor/delete/${email}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const DeleteUserEditorPermission = async (email) => {
    try {

        const response = await useAxios.delete(`/share/editor/permission/delete/${email}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};




export const GetAllTodolist_ReadAccess = async (offset, data) => {
    try {

        const response = await useAxios.post(`/share/read/${offset - 1}/4`, data ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const GetAllTodolist_ReadAccessByStatus = async (offset, status, data) => {
    try {

        const response = await useAxios.post(`/share/read/${status}/${offset - 1}/4`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const GetTodolist_ReadAccessById = async (id, data) => {
    try {

        const response = await useAxios.post(`/share/read/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetCountReadAccess = async (email) => {
    try {

        const response = await useAxios.get(`/share/count/${email}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetCountUserAccessByStatus = async (email, status) => {
    try {

        const response = await useAxios.get(`/share/count/${email}/${status}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const SearchUserReadAccess = async (data) => {
    try {

        const response = await useAxios.post(`/share/read/search`, data ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const SearchUserReadAccessByStatus = async (status, data) => {
    try {

        const response = await useAxios.post(`/share/read/search/${status}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const CreateTodolistUserEditorAccess = async (email, data) => {
    try {

        const response = await useAxios.post(`/share/create/${email}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const EditTodolistUserEditorAccess = async (email, id, data) => {
    try {

        const response = await useAxios.put(`/share/edit/${email}/${id}`, data , {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const DeleteTodolistUserEditorAccess = async (email, id) => {
    try {

        const response = await useAxios.delete(`/share/delete/${email}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};




