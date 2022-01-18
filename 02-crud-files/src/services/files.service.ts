import { writeFile, readFile } from "fs/promises";

export class FilesService<T> {
  constructor(private filePath: string) {}

  async write(data: T[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(data));
  }

  async read(): Promise<T[]> {
    const data = await readFile(this.filePath, "utf8");
    return JSON.parse(data);
  }
}
