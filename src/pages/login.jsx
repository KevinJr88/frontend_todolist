
// import {
//     Typography,
// } from "@material-tailwind/react";

// import {
//     LoginUser
// } from "../api/TodolistApi.jsx";

import {useState} from "react";


export function Login() {
    const[username, setIsUsername] = useState("");
    const[password, setIsPassword] = useState("");

    const handleSubmit = () => {
        console.log(username);
        console.log(password);
        postLogin(username, password);
    };
    console.log(username);
    console.log(password);



    const postLogin = async (username, password) => {
        try {
            console.log(username);
            console.log(password);
            // const submit = await LoginUser({username: username, password: password});
            // console.log(submit);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
                <form >
                    <div className="mb-4">
                        <label htmlFor="email"
                               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email
                            Address</label>
                        <input type="email" id="email"
                               className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                               placeholder="your@email.com" required
                               onChange={(e) => setIsUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password"
                               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input type="password" id="password"
                               className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                               placeholder="Enter your password" required
                               onChange={(e) => setIsPassword(e.target.value)}
                        />
                        <a href="#"
                           className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                            Password?</a>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">

                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember
                                me</label>
                        </div>
                        <a href="/register"
                           className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                            Account</a>
                    </div>
                    <button onClick={() => handleSubmit()} type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login
                    </button>
                </form>
            </div>
        </div>
    );
}
