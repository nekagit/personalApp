import axios from "axios";

const API_URL = "http://localhost:3000";

export interface ITodo {
  id?: number;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  created_at?: string;
}

export const fetchTodos = async (): Promise<ITodo[]> => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const addTodo = async (todo: Partial<ITodo>): Promise<ITodo> => {
  const response = await axios.post(`${API_URL}/todos`, todo);
  return response.data;
};

export const removeTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};

export const toggleTodo = async (
  id: number,
  completed: boolean
): Promise<void> => {
  await axios.patch(`${API_URL}/todos/${id}`, { completed });
};
