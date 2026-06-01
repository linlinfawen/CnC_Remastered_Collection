#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
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
} from './storage.js';

// 初始化存储
initStorage();

program
  .name('notes')
  .description('📝 Markdown Notes Manager - Fast and simple note management CLI')
  .version('1.0.0');

// 创建新笔记
program
  .command('create')
  .alias('c')
  .description('Create a new note')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Note title:',
          validate: (input) => input.length > 0 || 'Title cannot be empty',
        },
        {
          type: 'editor',
          name: 'content',
          message: 'Note content (opens editor):',
        },
        {
          type: 'input',
          name: 'tags',
          message: 'Tags (comma-separated):',
          filter: (input) => input.split(',').map(t => t.trim().toLowerCase()).filter(t => t),
        },
        {
          type: 'list',
          name: 'category',
          message: 'Category:',
          choices: [...getAllCategories(), '➕ New Category'],
          filter: (input) => input.replace('➕ New Category', '').trim(),
        },
      ]);

      if (answers.category === '') {
        const { newCat } = await inquirer.prompt([
          {
            type: 'input',
            name: 'newCat',
            message: 'Enter new category:',
            validate: (input) => input.length > 0 || 'Category cannot be empty',
          },
        ]);
        answers.category = newCat;
      }

      const note = createNote(answers.title, answers.content, answers.tags, answers.category);
      console.log(chalk.green(`✅ Note created successfully!`));
      console.log(chalk.dim(`ID: ${note.id}`));
    } catch (error) {
      console.error(chalk.red('❌ Error creating note:'), error.message);
    }
  });

// 列出所有笔记
program
  .command('list')
  .alias('ls')
  .description('List all notes')
  .action(() => {
    try {
      const notes = getAllNotes();
      
      if (notes.length === 0) {
        console.log(chalk.yellow('No notes found. Create one with: notes create'));
        return;
      }

      console.log(chalk.bold(`\n📚 All Notes (${notes.length}):\n`));
      
      notes.forEach((note, index) => {
        console.log(chalk.cyan(`${index + 1}. [${note.category}] ${note.title}`));
        console.log(chalk.gray(`   ID: ${note.id}`));
        if (note.tags.length > 0) {
          console.log(chalk.magenta(`   Tags: ${note.tags.join(', ')}`));
        }
        console.log(chalk.dim(`   Updated: ${new Date(note.updatedAt).toLocaleDateString()}\n`));
      });
    } catch (error) {
      console.error(chalk.red('❌ Error listing notes:'), error.message);
    }
  });

// 查看笔记详情
program
  .command('view <id>')
  .alias('v')
  .description('View a note')
  .action((id) => {
    try {
      const note = getNote(id);
      
      if (!note) {
        console.log(chalk.red('❌ Note not found'));
        return;
      }

      console.log(chalk.bold.cyan(`\n📄 ${note.title}\n`));
      console.log(chalk.gray(`Category: ${note.category}`));
      if (note.tags.length > 0) {
        console.log(chalk.magenta(`Tags: ${note.tags.join(', ')}`));
      }
      console.log(chalk.dim(`Created: ${new Date(note.createdAt).toLocaleString()}`));
      console.log(chalk.dim(`Updated: ${new Date(note.updatedAt).toLocaleString()}\n`));
      console.log(note.content);
      console.log();
    } catch (error) {
      console.error(chalk.red('❌ Error viewing note:'), error.message);
    }
  });

// 搜索笔记
program
  .command('search <query>')
  .alias('s')
  .description('Search notes by title, content, or tags')
  .action((query) => {
    try {
      const results = searchNotes(query);
      
      if (results.length === 0) {
        console.log(chalk.yellow(`No notes found matching "${query}"`));
        return;
      }

      console.log(chalk.bold(`\n🔍 Search Results for "${query}" (${results.length}):\n`));
      
      results.forEach((note, index) => {
        console.log(chalk.cyan(`${index + 1}. [${note.category}] ${note.title}`));
        console.log(chalk.gray(`   ID: ${note.id}`));
        console.log(chalk.dim(`   ${note.preview.substring(0, 80)}...\n`));
      });
    } catch (error) {
      console.error(chalk.red('❌ Error searching notes:'), error.message);
    }
  });

// ���标签搜索
program
  .command('tag <tagname>')
  .description('Show notes with a specific tag')
  .action((tagname) => {
    try {
      const results = searchByTag(tagname);
      
      if (results.length === 0) {
        console.log(chalk.yellow(`No notes found with tag "#${tagname}"`));
        return;
      }

      console.log(chalk.bold(`\n🏷️  Notes with tag "#${tagname}" (${results.length}):\n`));
      
      results.forEach((note, index) => {
        console.log(chalk.cyan(`${index + 1}. ${note.title}`));
        console.log(chalk.gray(`   ID: ${note.id}\n`));
      });
    } catch (error) {
      console.error(chalk.red('❌ Error searching by tag:'), error.message);
    }
  });

// 按分类搜索
program
  .command('category <category>')
  .alias('cat')
  .description('Show notes in a specific category')
  .action((category) => {
    try {
      const results = searchByCategory(category);
      
      if (results.length === 0) {
        console.log(chalk.yellow(`No notes found in category "${category}"`));
        return;
      }

      console.log(chalk.bold(`\n📂 Notes in category "${category}" (${results.length}):\n`));
      
      results.forEach((note, index) => {
        console.log(chalk.cyan(`${index + 1}. ${note.title}`));
        console.log(chalk.gray(`   ID: ${note.id}\n`));
      });
    } catch (error) {
      console.error(chalk.red('❌ Error searching by category:'), error.message);
    }
  });

// 列出所有标签
program
  .command('tags')
  .description('Show all available tags')
  .action(() => {
    try {
      const tags = getAllTags();
      
      if (tags.length === 0) {
        console.log(chalk.yellow('No tags found yet'));
        return;
      }

      console.log(chalk.bold('\n🏷️  All Tags:\n'));
      console.log(chalk.magenta(tags.map(t => `#${t}`).join('  ')));
      console.log();
    } catch (error) {
      console.error(chalk.red('❌ Error listing tags:'), error.message);
    }
  });

// 删除笔记
program
  .command('delete <id>')
  .alias('rm')
  .description('Delete a note')
  .action(async (id) => {
    try {
      const note = getNote(id);
      if (!note) {
        console.log(chalk.red('❌ Note not found'));
        return;
      }

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Delete "${note.title}"?`,
          default: false,
        },
      ]);

      if (confirm) {
        deleteNote(id);
        console.log(chalk.green('✅ Note deleted successfully!'));
      } else {
        console.log(chalk.dim('Cancelled'));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error deleting note:'), error.message);
    }
  });

// 帮助信息
program.on('--help', () => {
  console.log('\n' + chalk.bold('Examples:'));
  console.log('  notes create              Create a new note');
  console.log('  notes list                List all notes');
  console.log('  notes search "keyword"    Search notes');
  console.log('  notes view abc123         View a specific note');
  console.log('  notes tag coding          Show notes with tag "coding"');
  console.log('  notes delete abc123       Delete a note\n');
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
