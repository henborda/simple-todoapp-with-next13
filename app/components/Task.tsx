"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);


  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await editTodo({
        id: task.id,
        text: taskToEdit,
      });
      setOpenModalEdit(false);
      router.refresh();
    } catch (error) {
      console.error("Feil ved redigering av oppgave", error);

    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);
      setOpenModalDeleted(false);
      router.refresh();
    } catch (error) {
      console.error("Feil ved sletting av oppgave", error);
    }
  };
  
  return (
    <tr key={task.id}>
      <td className='w-full'>{task.text}</td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Endre oppgave</h3>
            <div className='modal-action'>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type='text'
                placeholder='Skriv her'
                className='input input-bordered w-full'
              />
              <button type='submit' className='btn'>
                Bekreft
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Er du sikker på du vil slette denne?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>
              Ja
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
