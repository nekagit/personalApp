import axios from "axios";

const API_URL = "http://localhost:3000";

export interface ICalendarEntry {
  id?: number;
  title: string;
  date: string;
  type: "birthday" | "appointment";
  completed: boolean;
  created_at?: string;
}

export const fetchCalendarEntries = async (): Promise<ICalendarEntry[]> => {
  const response = await axios.get(`${API_URL}/calendar`);
  return response.data;
};

export const addCalendarEntry = async (
  entry: Partial<ICalendarEntry>
): Promise<ICalendarEntry> => {
  const response = await axios.post(`${API_URL}/calendar`, entry);
  return response.data;
};

export const removeCalendarEntry = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/calendar/${id}`);
};

export const updateCalendarEntry = async (
  id: number,
  updates: Partial<ICalendarEntry>
): Promise<ICalendarEntry> => {
  const response = await axios.patch(`${API_URL}/calendar/${id}`, updates);
  return response.data;
};
