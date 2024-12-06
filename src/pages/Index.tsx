import { useState, useEffect } from "react";
import { Note } from "../types/note";
import { NoteList } from "../components/NoteList";
import { NoteEditor } from "../components/NoteEditor";
import { getNotes, saveNote, deleteNote } from "../services/noteService";
import { useToast } from "@/components/ui/use-toast";
import { PasswordPrompt } from "../components/PasswordPrompt";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadNotes();
    }
  }, [isAuthenticated]);

  const loadNotes = async () => {
    const fetchedNotes = await getNotes();
    setNotes(fetchedNotes);
  };

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

  const handleNoteChange = async (updatedNote: Note) => {
    await saveNote(updatedNote);
    await loadNotes();
    setSelectedNote(updatedNote);
  };

  const handleNoteDelete = async (id: string) => {
    await deleteNote(id);
    await loadNotes();
    setSelectedNote(null);
  };

  const handleBack = async () => {
    if (selectedNote) {
      await saveNote(selectedNote);
      await loadNotes();
      toast({
        description: "笔记已保存",
      });
    }
    setSelectedNote(null);
  };

  if (!isAuthenticated) {
    return <PasswordPrompt onAuthenticated={() => setIsAuthenticated(true)} />;
  }

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