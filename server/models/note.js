import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
});

export const Note = mongoose.model('Note', noteSchema);