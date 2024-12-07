import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Note } from './models/note.js';
import { Password } from './models/password.js';

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 连接MongoDB
mongoose.connect('mongodb://localhost:27017/notes-app')
  .then(() => console.log('已连接到MongoDB'))
  .catch((error) => console.error('MongoDB连接错误:', error));

// 获取所有笔记
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error('获取笔记失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 创建或更新笔记
app.post('/api/notes', async (req, res) => {
  try {
    const { id } = req.body;
    const note = await Note.findOneAndUpdate(
      { id },
      req.body,
      { upsert: true, new: true }
    );
    res.json(note);
  } catch (error) {
    console.error('保存笔记失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除笔记
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findOneAndDelete({ id: req.params.id });
    res.json({ message: '笔记已删除' });
  } catch (error) {
    console.error('删除笔记失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取密码
app.get('/api/password', async (req, res) => {
  try {
    const password = await Password.findOne();
    res.json({ password: password?.password });
  } catch (error) {
    console.error('获取密码失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 设置或更新密码
app.post('/api/password', async (req, res) => {
  try {
    const { password } = req.body;
    const existingPassword = await Password.findOne();
    
    if (existingPassword) {
      existingPassword.password = password;
      await existingPassword.save();
    } else {
      await Password.create({ password });
    }
    
    res.json({ message: '密码已更新' });
  } catch (error) {
    console.error('保存密码失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
