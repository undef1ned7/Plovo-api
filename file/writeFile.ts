import { promises as fs } from "node:fs";

const writeFile = async (filename: string, data: any) => {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("failed to write file", e);
  }
};

export default writeFile;
