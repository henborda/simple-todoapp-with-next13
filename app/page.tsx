import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import Link from "next/link";

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main className='max-w-6xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Forside</h1>
        <AddTask />
        <Link className="bg-blue-500 hover:bg-blue-700 te-center text-white font-bold py-5 px-4 rounded inline-block" href="/dashboard">Vis gjøremål</Link>
      </div>
      
      </main>
  );
}
