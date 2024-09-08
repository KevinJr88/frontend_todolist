import axios from "axios";
// export const BASE_URL = "http://127.0.0.1:8000";

export const BASE_URL = "http://localhost:8084";
// export const BASE_URL = "https://.online";

export const getImage = (image) => {
    console.log(`${image}`);
    return `${BASE_URL}/storage/${image}`;
};
const useAxios = axios.create({
    baseURL: `${BASE_URL}/api`,
});
export default useAxios;
