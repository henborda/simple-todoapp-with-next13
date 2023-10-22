"use client"
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [uniqueIdCounter, setUniqueIdCounter] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const generateUniqueID = () => {
    const uniqueID = `task-${uniqueIdCounter}`;
    setUniqueIdCounter(uniqueIdCounter + 1);
    return uniqueID;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!newTaskValue) {
      setErrorMessage("Vennligst skriv inn en oppgave.");
      return;
    }

    try {
      const uniqueID = generateUniqueID();
      await addTodo({
        id: uniqueID,
        text: newTaskValue,
      });
      setNewTaskValue("");
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      setErrorMessage("Feil ved oppretting av oppgave.");
    }
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">
        Legg til nytt gjøremål
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3>Legg til nytt gjøremål</h3>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Skriv her"
              className="input border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <button
              type="submit"
              className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Legg til
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;


