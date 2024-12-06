import { Note } from "../types/note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

interface NoteEditorProps {
  note: Note;
  onNoteChange: (note: Note) => void;
  onBack: () => void;
}

export const NoteEditor = ({ note, onNoteChange, onBack }: NoteEditorProps) => {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">编辑笔记</h2>
      </div>

      <Input
        placeholder="笔记标题"
        value={note.title}
        onChange={(e) =>
          onNoteChange({ ...note, title: e.target.value, updatedAt: new Date().toISOString() })
        }
        className="text-lg font-medium"
      />

      <Textarea
        placeholder="开始输入笔记内容..."
        value={note.content}
        onChange={(e) =>
          onNoteChange({ ...note, content: e.target.value, updatedAt: new Date().toISOString() })
        }
        className="min-h-[400px] resize-none"
      />
    </div>
  );
};