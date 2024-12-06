import { Note } from "../types/note";

const API_URL = "http://localhost:3000/api";

export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await fetch(`${API_URL}/notes`);
    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error("获取笔记失败:", error);
    return [];
  }
};

export const saveNote = async (note: Note): Promise<void> => {
  try {
    await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  } catch (error) {
    console.error("保存笔记失败:", error);
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("删除笔记失败:", error);
  }
};