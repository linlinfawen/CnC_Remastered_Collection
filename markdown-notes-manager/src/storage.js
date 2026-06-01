import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NOTES_DIR = path.join(os.homedir(), '.markdown-notes');
const INDEX_FILE = path.join(NOTES_DIR, 'index.json');

// 初始化存储目录
export function initStorage() {
  if (!fs.existsSync(NOTES_DIR)) {
    fs.mkdirSync(NOTES_DIR, { recursive: true });
    saveIndex({});
  }
}

// 获取索引文件
export function getIndex() {
  try {
    if (fs.existsSync(INDEX_FILE)) {
      const data = fs.readFileSync(INDEX_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading index:', error);
  }
  return {};
}

// 保存索引文件
export function saveIndex(index) {
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2), 'utf-8');
}

// 生成唯一ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 创建新笔记
export function createNote(title, content, tags = [], category = 'General') {
  const id = generateId();
  const index = getIndex();
  
  const note = {
    id,
    title,
    content,
    tags: Array.isArray(tags) ? tags : [tags],
    category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 保存笔记文件
  const notePath = path.join(NOTES_DIR, `${id}.md`);
  fs.writeFileSync(notePath, content, 'utf-8');

  // 更新索引
  index[id] = {
    ...note,
    file: `${id}.md`,
  };
  saveIndex(index);

  return note;
}

// 获取笔记
export function getNote(id) {
  const index = getIndex();
  const noteInfo = index[id];
  
  if (!noteInfo) return null;

  const notePath = path.join(NOTES_DIR, noteInfo.file);
  if (fs.existsSync(notePath)) {
    const content = fs.readFileSync(notePath, 'utf-8');
    return { ...noteInfo, content };
  }
  return null;
}

// 获取所有笔记
export function getAllNotes() {
  const index = getIndex();
  return Object.values(index).map(note => ({
    ...note,
    preview: note.content ? note.content.substring(0, 100) : '',
  }));
}

// 更新笔记
export function updateNote(id, updates) {
  const index = getIndex();
  const noteInfo = index[id];
  
  if (!noteInfo) return null;

  const updatedNote = {
    ...noteInfo,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  // 更新内容
  if (updates.content) {
    const notePath = path.join(NOTES_DIR, noteInfo.file);
    fs.writeFileSync(notePath, updates.content, 'utf-8');
  }

  index[id] = updatedNote;
  saveIndex(index);
  
  return updatedNote;
}

// 删除笔记
export function deleteNote(id) {
  const index = getIndex();
  const noteInfo = index[id];
  
  if (!noteInfo) return false;

  const notePath = path.join(NOTES_DIR, noteInfo.file);
  if (fs.existsSync(notePath)) {
    fs.unlinkSync(notePath);
  }

  delete index[id];
  saveIndex(index);
  return true;
}

// 按标签搜索
export function searchByTag(tag) {
  const notes = getAllNotes();
  return notes.filter(note => note.tags.includes(tag.toLowerCase()));
}

// 按分类搜索
export function searchByCategory(category) {
  const notes = getAllNotes();
  return notes.filter(note => note.category.toLowerCase() === category.toLowerCase());
}

// 全文搜索
export function searchNotes(query) {
  const notes = getAllNotes();
  const lowerQuery = query.toLowerCase();
  
  return notes.filter(note => 
    note.title.toLowerCase().includes(lowerQuery) ||
    note.content.toLowerCase().includes(lowerQuery) ||
    note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// 获取所有标签
export function getAllTags() {
  const notes = getAllNotes();
  const tags = new Set();
  
  notes.forEach(note => {
    note.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

// 获取所有分类
export function getAllCategories() {
  const notes = getAllNotes();
  const categories = new Set();
  
  notes.forEach(note => {
    categories.add(note.category);
  });
  
  return Array.from(categories).sort();
}
