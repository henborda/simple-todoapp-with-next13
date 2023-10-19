import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const getAllTodos = async () => {
  const response = await axios.get(`${baseUrl}/tasks`);
  return response.data;
}

export const addTodo = async (todo: { id: string; text: string; }) => {
  const response = await axios.post(`${baseUrl}/tasks`, todo);
  return response.data;
}

export const editTodo = async (todo: { id: any; text?: string; }) => {
  const response = await axios.put(`${baseUrl}/tasks/${todo.id}`, todo);
  return response.data;
}

export const deleteTodo = async (id: string) => {
  await axios.delete(`${baseUrl}/tasks/${id}`);
}
