import { initStorage, createNote, getAllNotes, searchNotes, searchByTag, searchByCategory } from './storage.js';

// Export all storage functions
export * from './storage.js';

// Initialize on import
initStorage();
