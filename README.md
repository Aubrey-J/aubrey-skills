# Aubrey's Personal Skills

This repository contains personal skills developed by Aubrey, organized under the `skills` directory.

## Multilingual README

- [English](README.md)
- [中文](README-zh.md)

## Project Structure

```
aubrey-skills/
├── skills/
│   └── website-content-fetch/      # Website content fetching skill
│       ├── evals/                  # Evaluation files
│       │   └── evals.json
│       ├── scripts/                # Main script files
│       │   └── fetch-content.js    # Core functionality
│       ├── SKILL.md                # Skill documentation
│       └── package.json            # Dependencies
└── .gitignore
```

## Available Skills

### website-content-fetch

A skill designed to fetch and extract content from websites, including text content and media resources.

#### Features

- **Text Content Extraction**: Extracts all text content from a webpage
- **Media Resource Detection**: Identifies and collects URLs of media files including:
  - Images
  - Videos
  - Audio files
- **Media Saving (Optional)**: Can save media files to a specified directory

#### Dependencies

- axios: For making HTTP requests
- cheerio: For parsing HTML content

#### Usage

1. Install dependencies:

   ```bash
   cd skills/website-content-fetch
   npm install
   ```

2. Run the skill:

   ```bash
   node scripts/fetch-content.js <url> [save-directory]
   ```

   - `<url>`: The website URL to fetch content from
   - `[save-directory]`: Optional directory to save media files

#### Example

```bash
# Fetch content from a website
node scripts/fetch-content.js https://example.com

# Fetch content and save media files
node scripts/fetch-content.js https://example.com ./media
```

## Future Skills

This repository is intended to grow with additional skills as they are developed. Each skill will be organized in its own directory under the `skills` folder.

## Contributing

This is a personal project, but feel free to fork and adapt the skills for your own use.

## License

MIT