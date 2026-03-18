const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");

/**
 * Fetch website content
 * @param {string} url - The URL to fetch
 * @param {object} options - Optional parameters
 * @param {string} options.saveDir - Directory to save media files (optional)
 * @returns {Promise<object>} - The fetched content and metadata
 */
async function fetchWebsiteContent(url, options = {}) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract text content
    let content = $("body").text().trim();

    // Clean up content
    content = content.replace(/\s+/g, " ");

    // Extract media resources
    const media = {
      images: [],
      videos: [],
      audios: [],
    };

    // Extract images
    $("img").each((i, elem) => {
      const src = $(elem).attr("src");
      const alt = $(elem).attr("alt") || "";
      if (src) {
        const absoluteUrl = new URL(src, url).href;
        media.images.push({
          url: absoluteUrl,
          alt: alt,
        });
      }
    });

    // Extract videos
    $("video, iframe").each((i, elem) => {
      let src = $(elem).attr("src");
      if (!src && $(elem).attr("data-src")) {
        src = $(elem).attr("data-src");
      }
      if (src) {
        const absoluteUrl = new URL(src, url).href;
        media.videos.push({
          url: absoluteUrl,
        });
      }
    });

    // Extract audios
    $("audio").each((i, elem) => {
      const src = $(elem).attr("src");
      if (src) {
        const absoluteUrl = new URL(src, url).href;
        media.audios.push({
          url: absoluteUrl,
        });
      }
    });

    // Save media files if saveDir is provided
    if (options.saveDir) {
      // Create save directory if it doesn't exist
      if (!fs.existsSync(options.saveDir)) {
        fs.mkdirSync(options.saveDir, { recursive: true });
      }

      // Save images
      for (let i = 0; i < media.images.length; i++) {
        const image = media.images[i];
        try {
          const imageResponse = await axios.get(image.url, {
            responseType: "stream",
          });
          const imageName = `image_${i}_${path.basename(new URL(image.url).pathname)}`;
          const imagePath = path.join(options.saveDir, imageName);
          const writer = fs.createWriteStream(imagePath);
          imageResponse.data.pipe(writer);
          await new Promise((resolve, reject) => {
            writer.on("finish", () => resolve());
            writer.on("error", reject);
          });
          image.localPath = imagePath;
        } catch (error) {
          console.error(`Error saving image ${image.url}:`, error.message);
        }
      }

      // Save videos
      for (let i = 0; i < media.videos.length; i++) {
        const video = media.videos[i];
        try {
          const videoResponse = await axios.get(video.url, {
            responseType: "stream",
          });
          const videoName = `video_${i}_${path.basename(new URL(video.url).pathname)}`;
          const videoPath = path.join(options.saveDir, videoName);
          const writer = fs.createWriteStream(videoPath);
          videoResponse.data.pipe(writer);
          await new Promise((resolve, reject) => {
            writer.on("finish", () => resolve());
            writer.on("error", reject);
          });
          video.localPath = videoPath;
        } catch (error) {
          console.error(`Error saving video ${video.url}:`, error.message);
        }
      }

      // Save audios
      for (let i = 0; i < media.audios.length; i++) {
        const audio = media.audios[i];
        try {
          const audioResponse = await axios.get(audio.url, {
            responseType: "stream",
          });
          const audioName = `audio_${i}_${path.basename(new URL(audio.url).pathname)}`;
          const audioPath = path.join(options.saveDir, audioName);
          const writer = fs.createWriteStream(audioPath);
          audioResponse.data.pipe(writer);
          await new Promise((resolve, reject) => {
            writer.on("finish", () => resolve());
            writer.on("error", reject);
          });
          audio.localPath = audioPath;
        } catch (error) {
          console.error(`Error saving audio ${audio.url}:`, error.message);
        }
      }
    }

    return {
      content,
      length: content.length,
      url,
      media,
    };
  } catch (error) {
    console.error("Error fetching website content:", error);
    throw new Error(`Failed to fetch content from ${url}: ${error.message}`);
  }
}

// If run directly, test the function
if (require.main === module) {
  const url = process.argv[2] || "https://example.com";
  const saveDir = process.argv[3];

  const options = {};
  if (saveDir) {
    options.saveDir = saveDir;
  }

  fetchWebsiteContent(url, options)
    .then((result) => {
      console.log("Fetched content:");
      console.log(`URL: ${result.url}`);
      console.log(`Length: ${result.length} characters`);
      console.log("Content:");
      console.log(result.content);

      // Display media resources
      console.log("\nMedia resources:");

      if (result.media.images.length > 0) {
        console.log("Images:");
        result.media.images.forEach((image, index) => {
          console.log(`${index + 1}. ${image.url} (alt: ${image.alt})`);
          if (image.localPath) {
            console.log(`   Saved to: ${image.localPath}`);
          }
        });
      }

      if (result.media.videos.length > 0) {
        console.log("\nVideos:");
        result.media.videos.forEach((video, index) => {
          console.log(`${index + 1}. ${video.url}`);
          if (video.localPath) {
            console.log(`   Saved to: ${video.localPath}`);
          }
        });
      }

      if (result.media.audios.length > 0) {
        console.log("\nAudios:");
        result.media.audios.forEach((audio, index) => {
          console.log(`${index + 1}. ${audio.url}`);
          if (audio.localPath) {
            console.log(`   Saved to: ${audio.localPath}`);
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

module.exports = { fetchWebsiteContent };
