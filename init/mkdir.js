import fs from "fs";

export async function mkdir(path) {
  try {
    await fs.promises.mkdir(path, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}
