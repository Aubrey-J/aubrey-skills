---
name: website-content-fetch
description: Fetch and extract content from websites. Use this skill whenever the user mentions fetching website content, extracting text from web pages, or needing to get content from a URL, even if they don't explicitly ask for a 'website content fetch' skill.
---

# Openclaw Website Content Fetch

This skill fetches and extracts content from websites, returning the text content of the page.

## Usage

To use this skill, provide a URL parameter:

```javascript
const result = await skill('website-content-fetch', {
  url: 'https://example.com'
});
```

## Parameters

- `url` (required): The URL of the website to fetch content from
- `saveDir` (optional): Directory to save media files locally

## Return Value

The skill returns an object with the following properties:
- `content`: The extracted text content of the website
- `length`: The length of the extracted content
- `url`: The URL that was fetched
- `media`: An object containing media resources found on the page
  - `images`: Array of image objects with `url`, `alt`, and optionally `localPath` properties
  - `videos`: Array of video objects with `url` and optionally `localPath` properties
  - `audios`: Array of audio objects with `url` and optionally `localPath` properties

## Examples

### Example 1: Fetch content from a website
```javascript
const result = await skill('website-content-fetch', {
  url: 'https://example.com'
});
console.log(result.content);

// Access media resources
console.log('Images:', result.media.images);
console.log('Videos:', result.media.videos);
console.log('Audios:', result.media.audios);
```

### Example 2: Save media files locally
```javascript
const result = await skill('website-content-fetch', {
  url: 'https://example.com',
  saveDir: './media'
});
console.log(result.content);

// Access media resources with local paths
result.media.images.forEach(image => {
  console.log(`Image: ${image.url}`);
  if (image.localPath) {
    console.log(`Saved to: ${image.localPath}`);
  }
});
```

### Example 3: Error handling
```javascript
try {
  const result = await skill('website-content-fetch', {
    url: 'https://nonexistent-domain-12345.com'
  });
  console.log(result.content);
} catch (error) {
  console.error('Error fetching content:', error.message);
}
```

## Guidelines

- This skill extracts text content and media resources from websites
- It may not work correctly for websites with heavy JavaScript rendering
- Always handle errors appropriately when using this skill
- The skill uses axios for HTTP requests and cheerio for HTML parsing
- Media resources are returned as URLs by default, and can be saved locally by providing a saveDir parameter