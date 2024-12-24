import { defineStore } from 'pinia';
import { fileSystemService } from '@/services/fileSystem';
import { markdownService } from '@/services/markdownService';

export const useMarkdownStore = defineStore('markdown', {
  state: () => ({
    // File System State
    files: [],
    fileHandles: new Map(),
    directoryHandle: null,
    currentFile: '',
    currentFileHandle: null,
    markdownContent: '',

    // UI State
    showRevisionEditor: false,
    showPdfViewer: false,
    pdfUrl: '',
    currentPdfName: '',
  }),

  actions: {
    setFolderData({ files, fileHandles, directoryHandle }) {
      this.files = fileSystemService.sortFilesByName(files);
      this.fileHandles = fileHandles;
      this.directoryHandle = directoryHandle;
    },

    async loadFile(file) {
      try {
        const fileHandle = this.fileHandles.get(file.path);
        if (!fileHandle) throw new Error("File handle not found");

        const fileData = await fileHandle.getFile();
        const content = await fileData.text();

        this.currentFile = file.path;
        this.currentFileHandle = fileHandle;
        this.markdownContent = content;
      } catch (error) {
        console.error("Error loading file:", error);
        throw new Error("Error loading file. Please try again.");
      }
    },

    async saveChanges(content) {
      try {
        if (!this.currentFileHandle) throw new Error("No file handle available");
        
        await markdownService.saveFile(this.currentFileHandle, content);
        this.markdownContent = content;
        
        return true;
      } catch (error) {
        console.error("Error saving changes:", error);
        throw new Error(`Error saving changes: ${error.message}`);
      }
    },

    setPdfData(url, name) {
      this.pdfUrl = url;
      this.currentPdfName = name;
      this.showPdfViewer = true;
    },

    closePdfViewer() {
      if (this.pdfUrl) {
        URL.revokeObjectURL(this.pdfUrl);
      }
      
      this.showPdfViewer = false;
      this.pdfUrl = '';
      this.currentPdfName = '';
    },

    toggleRevisionEditor(show) {
      this.showRevisionEditor = show;
    },

    async saveRevision({ title, content }) {
      try {
        if (!this.directoryHandle) {
          throw new Error('No directory access');
        }

        const revisionsDir = await this.directoryHandle.getDirectoryHandle('revisions', {
          create: true
        });

        const revisionData = [
          `# ${title}`,
          '',
          `Original File: ${this.currentFile}`,
          `Created: ${new Date().toISOString()}`,
          '',
          '## Notes',
          '',
          content
        ].join('\n');

        const fileName = `${title}.md`;
        const fileHandle = await revisionsDir.getFileHandle(fileName, { create: true });
        await markdownService.saveFile(fileHandle, revisionData);

        const { files: newFiles, fileHandles: newHandles } = 
          await fileSystemService.getFilesRecursively(this.directoryHandle);
        
        this.files = newFiles;
        this.fileHandles = newHandles;
        this.showRevisionEditor = false;

        return true;
      } catch (error) {
        console.error('Error saving revision:', error);
        throw new Error(`Error saving revision: ${error.message}`);
      }
    },

    updateMarkdownContent(content) {
      this.markdownContent = content;
    },

    reset() {
      if (this.pdfUrl) {
        URL.revokeObjectURL(this.pdfUrl);
      }
      
      this.files = [];
      this.fileHandles = new Map();
      this.directoryHandle = null;
      this.currentFile = '';
      this.currentFileHandle = null;
      this.markdownContent = '';
      this.showRevisionEditor = false;
      this.showPdfViewer = false;
      this.pdfUrl = '';
      this.currentPdfName = '';
    }
  },

  getters: {
    hasActiveFile: (state) => !!state.currentFile,
    currentFileName: (state) => state.currentFile.split('/').pop() || '',
    isEditorDirty: (state) => (newContent) => state.markdownContent !== newContent,
  }
});
