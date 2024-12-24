// src/services/markdownService.js
import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export const markdownService = {
  parseMarkdown(content) {
    const sanitizedContent = content.replace(/\[object Object\]/g, (match) =>
      JSON.stringify(match)
    );
    const rawHtml = md.render(sanitizedContent);
    return DOMPurify.sanitize(rawHtml);
  },

  async saveFile(fileHandle, content) {
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  },
};
