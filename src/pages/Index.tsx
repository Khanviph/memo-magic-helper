import { useState, useEffect } from "react";
import { Note } from "../types/note";
import { NoteList } from "../components/NoteList";
import { NoteEditor } from "../components/NoteEditor";
import { getNotes, saveNote, deleteNote } from "../services/noteService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSelectedNote(newNote);
  };

  const handleNoteChange = (updatedNote: Note) => {
    saveNote(updatedNote);
    setNotes(getNotes());
    setSelectedNote(updatedNote);
  };

  const handleNoteDelete = (id: string) => {
    deleteNote(id);
    setNotes(getNotes());
    setSelectedNote(null);
  };

  const handleBack = () => {
    if (selectedNote) {
      saveNote(selectedNote);
      setNotes(getNotes());
      toast({
        description: "笔记已保存",
      });
    }
    setSelectedNote(null);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onNoteChange={handleNoteChange}
            onBack={handleBack}
          />
        ) : (
          <NoteList
            notes={notes}
            onNoteSelect={setSelectedNote}
            onNoteDelete={handleNoteDelete}
            onNewNote={handleNewNote}
          />
        )}
      </div>
    </div>
  );
};

export default Index;