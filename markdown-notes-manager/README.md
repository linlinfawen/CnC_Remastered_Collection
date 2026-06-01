# 📝 Markdown Notes Manager

A fast, simple, and powerful CLI tool for managing Markdown notes with tagging, searching, and categorization. Perfect for students, developers, and anyone who loves organizing their thoughts!

## ✨ Features

- ✅ **Create Notes** - Write notes in Markdown format with ease
- 🏷️ **Tagging System** - Organize notes with flexible tags
- 📂 **Categories** - Group related notes together
- 🔍 **Full-Text Search** - Search by title, content, or tags
- 💾 **Local Storage** - All notes stored locally in your home directory
- ⚡ **Fast & Lightweight** - CLI-based for maximum speed
- 📱 **User-Friendly** - Interactive prompts and beautiful formatting

## 🚀 Installation

### Using npm (Coming Soon)
\`\`\`bash
npm install -g markdown-notes-manager
notes --version
\`\`\`

### From GitHub
\`\`\`bash
git clone https://github.com/linlinfawen/CnC_Remastered_Collection.git
cd markdown-notes-manager
npm install
npm link  # Make 'notes' command available globally
\`\`\`

## 📖 Usage

### Create a Note
\`\`\`bash
notes create
# or
notes c
\`\`\`
Interactive prompts will guide you through:
- Title
- Content (opens your default editor)
- Tags (comma-separated)
- Category

### List All Notes
\`\`\`bash
notes list
# or
notes ls
\`\`\`

### View a Specific Note
\`\`\`bash
notes view <id>
# or
notes v <id>
\`\`\`

Example:
\`\`\`bash
notes view abc123def456
\`\`\`

### Search Notes
\`\`\`bash
notes search "keyword"
# or
notes s "keyword"
\`\`\`

Search works across:
- Note titles
- Content
- Tags

### Search by Tag
\`\`\`bash
notes tag coding
notes tag javascript
\`\`\`

### Search by Category
\`\`\`bash
notes category Work
# or
notes cat Personal
\`\`\`

### View All Tags
\`\`\`bash
notes tags
\`\`\`

### Delete a Note
\`\`\`bash
notes delete <id>
# or
notes rm <id>
\`\`\`

You'll be prompted to confirm before deletion.

## 📁 Project Structure

\`\`\`
markdown-notes-manager/
├── src/
│   ├── cli.js          # Main CLI interface
│   ├── storage.js      # Storage and data management
│   └── index.js        # Main entry point
├── test/               # Test files
├── package.json        # Project configuration
├── README.md           # This file
└── .gitignore         # Git ignore rules
\`\`\`

## 💾 Data Storage

All notes are stored locally in: \`~/.markdown-notes/\`

- **index.json** - Metadata and index
- **{id}.md** - Individual note files

This ensures your notes are:
- Private (no cloud sync)
- Fast (local access)
- Portable (easy backup)

## 🛠️ Development

### Setup Development Environment
\`\`\`bash
git clone https://github.com/linlinfawen/CnC_Remastered_Collection.git
cd markdown-notes-manager
npm install
\`\`\`

### Run in Development Mode
\`\`\`bash
npm run dev
\`\`\`

### Run Tests
\`\`\`bash
npm test
\`\`\`

### Code Style
\`\`\`bash
npm run lint
\`\`\`

## 📦 Dependencies

- **chalk** - Colored terminal output
- **commander** - CLI argument parsing
- **inquirer** - Interactive prompts
- **fuzzy** - Fuzzy matching for search

## 🎯 Examples

### Example 1: Study Notes
\`\`\`bash
$ notes create
# Title: JavaScript Promises
# Tags: javascript, async, learning
# Category: Study

$ notes search "promise"
$ notes tag javascript
\`\`\`

### Example 2: Work Documentation
\`\`\`bash
$ notes create
# Title: API Integration Guide
# Tags: api, rest, documentation
# Category: Work

$ notes category Work
\`\`\`

### Example 3: Quick Reference
\`\`\`bash
$ notes search "regex"
$ notes view abc123def456
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute
1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 Future Features

- [ ] Export notes to PDF
- [ ] Note editing via CLI
- [ ] Cloud sync (optional)
- [ ] Web interface
- [ ] Mobile companion app
- [ ] Collaborative notes
- [ ] Version history
- [ ] Note encryption
- [ ] Markdown preview
- [ ] Integration with GitHub Gists

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

Have questions or issues? 

- 📧 Open an [Issue](https://github.com/linlinfawen/CnC_Remastered_Collection/issues)
- 💬 Start a [Discussion](https://github.com/linlinfawen/CnC_Remastered_Collection/discussions)

## 👨‍💻 Author

Created with ❤️ by [linlinfawen](https://github.com/linlinfawen)

---

**Happy Note-Taking! 📚✨**
