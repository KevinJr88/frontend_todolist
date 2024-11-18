

import {
    Typography,
} from "@material-tailwind/react";
import { TodolistTemplate } from "../components/template/todolistComponent";

export function Todolist() {

    return (
        <div className="flex justify-center">
            <div className="w-[90vw] md:w-[60vw] p-8">
                <Typography variant="h1" className="text-[30px] font-bold text-center">SIMPLE TO DO LIST</Typography>
                <TodolistTemplate />
            </div>
        </div>
    );
}
