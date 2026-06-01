import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  initStorage,
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
  searchNotes,
  searchByTag,
  searchByCategory,
  getAllTags,
  getAllCategories,
} from '../src/storage.js';

describe('Markdown Notes Manager - Storage Tests', () => {
  
  describe('Note Creation', () => {
    it('should create a new note with title, content, tags, and category', () => {
      const note = createNote('Test Note', 'Test Content', ['test', 'demo'], 'Test Category');
      
      assert.ok(note.id, 'Note should have an ID');
      assert.strictEqual(note.title, 'Test Note', 'Title should match');
      assert.strictEqual(note.content, 'Test Content', 'Content should match');
      assert.deepStrictEqual(note.tags, ['test', 'demo'], 'Tags should match');
      assert.strictEqual(note.category, 'Test Category', 'Category should match');
    });

    it('should create a note with default category if not provided', () => {
      const note = createNote('Default Category Note', 'Content');
      assert.strictEqual(note.category, 'General', 'Default category should be "General"');
    });

    it('should generate unique IDs for different notes', () => {
      const note1 = createNote('Note 1', 'Content 1');
      const note2 = createNote('Note 2', 'Content 2');
      
      assert.notStrictEqual(note1.id, note2.id, 'IDs should be unique');
    });
  });

  describe('Note Retrieval', () => {
    it('should retrieve a note by ID', () => {
      const created = createNote('Retrieve Test', 'Test Content', ['retrieve']);
      const retrieved = getNote(created.id);
      
      assert.ok(retrieved, 'Note should be retrieved');
      assert.strictEqual(retrieved.title, 'Retrieve Test', 'Retrieved note title should match');
      assert.strictEqual(retrieved.content, 'Test Content', 'Retrieved note content should match');
    });

    it('should return null for non-existent note', () => {
      const note = getNote('non-existent-id');
      assert.strictEqual(note, null, 'Should return null for non-existent note');
    });

    it('should get all notes', () => {
      const initialCount = getAllNotes().length;
      createNote('All Notes Test 1', 'Content 1');
      createNote('All Notes Test 2', 'Content 2');
      
      const allNotes = getAllNotes();
      assert.ok(allNotes.length >= initialCount + 2, 'Should include newly created notes');
    });
  });

  describe('Note Update', () => {
    it('should update note title', () => {
      const note = createNote('Original Title', 'Content');
      const updated = updateNote(note.id, { title: 'Updated Title' });
      
      assert.strictEqual(updated.title, 'Updated Title', 'Title should be updated');
    });

    it('should update note content', () => {
      const note = createNote('Title', 'Original Content');
      const updated = updateNote(note.id, { content: 'Updated Content' });
      
      assert.strictEqual(updated.content, 'Updated Content', 'Content should be updated');
    });

    it('should return null when updating non-existent note', () => {
      const result = updateNote('non-existent', { title: 'New Title' });
      assert.strictEqual(result, null, 'Should return null for non-existent note');
    });
  });

  describe('Note Deletion', () => {
    it('should delete a note', () => {
      const note = createNote('Delete Me', 'Content');
      const deleted = deleteNote(note.id);
      
      assert.strictEqual(deleted, true, 'Delete should return true');
      assert.strictEqual(getNote(note.id), null, 'Deleted note should not be retrievable');
    });

    it('should return false when deleting non-existent note', () => {
      const result = deleteNote('non-existent-id');
      assert.strictEqual(result, false, 'Should return false for non-existent note');
    });
  });

  describe('Search Functionality', () => {
    it('should search notes by title', () => {
      createNote('JavaScript Basics', 'Learn JS fundamentals', ['js', 'learning']);
      const results = searchNotes('JavaScript');
      
      assert.ok(results.some(n => n.title.includes('JavaScript')), 'Should find note by title');
    });

    it('should search notes by content', () => {
      createNote('Hidden Content', 'This note contains specific keywords', ['search']);
      const results = searchNotes('specific keywords');
      
      assert.ok(results.length > 0, 'Should find note by content');
    });

    it('should search notes by tags', () => {
      createNote('Tagged Note', 'Content', ['search-tag', 'demo']);
      const results = searchNotes('search-tag');
      
      assert.ok(results.length > 0, 'Should find note by tag');
    });

    it('should return empty array for no matches', () => {
      const results = searchNotes('zzzzuniquezzz');
      assert.strictEqual(results.length, 0, 'Should return empty array for no matches');
    });
  });

  describe('Tag Search', () => {
    it('should find notes with specific tag', () => {
      createNote('Python Note', 'Learn Python', ['python', 'programming']);
      const results = searchByTag('python');
      
      assert.ok(results.length > 0, 'Should find notes with the tag');
    });

    it('should handle case-insensitive tag search', () => {
      createNote('Tag Case Test', 'Content', ['CaseSensitive']);
      const results = searchByTag('casesensitive');
      
      assert.ok(results.length > 0, 'Should be case-insensitive');
    });
  });

  describe('Category Search', () => {
    it('should find notes by category', () => {
      createNote('Work Note', 'Work Content', ['work'], 'Work');
      const results = searchByCategory('Work');
      
      assert.ok(results.length > 0, 'Should find notes by category');
    });

    it('should be case-insensitive for categories', () => {
      createNote('Study Note', 'Study Content', ['study'], 'Study');
      const results = searchByCategory('study');
      
      assert.ok(results.length > 0, 'Should be case-insensitive');
    });
  });

  describe('Tag and Category Management', () => {
    it('should get all unique tags', () => {
      createNote('Tag Test 1', 'Content', ['unique-tag-1', 'shared-tag']);
      createNote('Tag Test 2', 'Content', ['unique-tag-2', 'shared-tag']);
      
      const tags = getAllTags();
      assert.ok(tags.includes('unique-tag-1'), 'Should include unique-tag-1');
      assert.ok(tags.includes('unique-tag-2'), 'Should include unique-tag-2');
      assert.ok(tags.includes('shared-tag'), 'Should include shared-tag');
    });

    it('should get all categories', () => {
      createNote('Cat Test 1', 'Content', [], 'Category A');
      createNote('Cat Test 2', 'Content', [], 'Category B');
      
      const categories = getAllCategories();
      assert.ok(categories.includes('Category A'), 'Should include Category A');
      assert.ok(categories.includes('Category B'), 'Should include Category B');
    });
  });
});
