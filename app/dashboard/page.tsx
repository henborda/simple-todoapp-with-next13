import Link from "next/link";
import TodoList from "../components/TodoList";
import { getAllTodos } from "@/api";

export default async function Dashboard(){
    const tasks = await getAllTodos();
    return (
        <main className='max-w-6xl mx-auto mt-4'>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
            <TodoList tasks={tasks} />
            <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-5 px-4 rounded inline-block" href="/">Legg til flere gjøremål</Link>
        </main>
    )
}
