import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  password: { type: String, required: true }
});

export const Password = mongoose.model('Password', passwordSchema);