import { Note } from "../types/note";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NoteListProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
  onNoteDelete: (id: string) => void;
  onNewNote: () => void;
}

export const NoteList = ({ notes, onNoteSelect, onNoteDelete, onNewNote }: NoteListProps) => {
  const { toast } = useToast();

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onNoteDelete(id);
    toast({
      description: "笔记已删除",
    });
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">我的笔记</h2>
        <Button onClick={onNewNote} variant="outline" size="icon">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNoteSelect(note)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium mb-1">{note.title || "无标题"}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {note.content || "空白笔记"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleDelete(note.id, e)}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
        
        {notes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            没有笔记，点击右上角按钮创建新笔记
          </div>
        )}
      </div>
    </div>
  );
};