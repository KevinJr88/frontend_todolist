
import { useState } from "react";

import {
    RegisterUser
} from "../api/TodolistApi.jsx";


export function Register() {
    const[username, setIsUsername] = useState("");
    const[password, setIsPassword] = useState("");
    const[address, setIsAddress] = useState("");
    const[firstName, setIsFirstName] = useState("");
    const[lastName, setIsLastName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        postRegister(username, password, email,address, firstName, lastName);
        
    };
    
    const postRegister = async (username, password, email, address, firstName, lastName) => {
        try {
            const submit = await RegisterUser({
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: username,
                address: address,
                roles: ["ROLE_USER"],
                enabled: true,
            });
            window.location.href = "/login";
            console.log(submit);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(username);
    console.log(password);
    console.log(firstName);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col  items-center  justify-center px-6 py-8 w-full  lg:py-0">
                <div
                    className=" bg-white  rounded-lg shadow dark:border md:mt-0 w-[60%] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
                            <div className="flex gap-3 w-full">
                                <div className="w-full">
                                    <label htmlFor="firstName"
                                           className="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                                        First Name</label>
                                    <input type="text" name="firstName" id="firstName"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Kevin" required="" onChange={(e) => setIsFirstName(e.target.value)}/>

                                </div>
                                <div className="w-full">
                                    <label htmlFor="lastName"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Last Name</label>
                                    <input type="text" name="lastName" id="lastName"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Rahadinata" required="" onChange={(e) => setIsLastName(e.target.value)}/>
                                </div>

                            </div>

                            <div className="flex gap-3 w-full">
                                <div className="w-full">
                                    <label htmlFor="address"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Address</label>
                                    <input type="text" name="address" id="address"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Jl Suryo" required="" onChange={(e) => setIsAddress(e.target.value)}/>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        email</label>
                                    <input type="email" name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com" required="" onChange={(e) => setIsUsername(e.target.value)}/>
                                </div>
                            </div>


                            
                                <div className="w-full">
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required="" onChange={(e) => setIsPassword(e.target.value)}/>
                                </div>
                               

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                           required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I
                                        accept the <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                                an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/frontend_todolist/#/login"
                                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
