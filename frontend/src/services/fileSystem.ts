export const fileSystemService = {
  async requestDirectoryAccess() {
    try {
      return await window.showDirectoryPicker({ mode: "readwrite" });
    } catch (error) {
      console.error("Error accessing directory:", error);
      return null;
    }
  },
  // src/services/fileSystem.js
  sortFilesByName(files: any[]) {
    return files.sort((a, b) => {
      const nameA = a.name.toLowerCase(); // Convert to lower case for case-insensitive comparison
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB); // Compare filenames alphabetically
    });
  },
  async getFilesRecursively(dirHandle, path = "") {
    const tmpFiles = [];
    const fileHandles = new Map();

    async function* traverse(handle, currentPath) {
      for await (const entry of handle.values()) {
        const newPath = currentPath
          ? `${currentPath}/${entry.name}`
          : entry.name;

        if (entry.kind === "directory") {
          yield* traverse(entry, newPath);
        } else if (entry.name.endsWith(".md")) {
          yield { handle: entry, path: newPath };
        }
      }
    }

    for await (const fileEntry of traverse(dirHandle)) {
      const file = await fileEntry.handle.getFile();
      tmpFiles.push({
        name: file.name,
        path: fileEntry.path,
        file,
      });
      fileHandles.set(fileEntry.path, fileEntry.handle);
    }
    const files = this.sortFilesByName(tmpFiles);

    return { files, fileHandles };
  },
};
