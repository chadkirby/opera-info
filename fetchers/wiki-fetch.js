import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fetch from "node-fetch";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import URL from "url";

dotenv.config();

const wait = promisify(setTimeout);

const tmpDir = `${
  process.env["RUNNER_TEMP"] || process.env["TMPDIR"]
}/opera-wiki`;

try {
  fs.mkdirSync(tmpDir);
} catch (error) {
  if (error.code !== "EEXIST") {
    throw error;
  }
}

/**
 *
 *
 * @export
 * @param {string} url
 */

let lastReqTime = 0;

export async function wikiFetch(url) {
  // convert the input url to a file path in the tmpDir
  const filePath = `${tmpDir}/${URL.parse(url).pathname}`;
  // if the file already exists, read the contents and return them
  try {
    return await fs.promises.readFile(filePath, "utf-8");
  } catch (error) {
    // if the file doesn't exist, fetch the url and save the contents to the file
  }

  let now = Date.now();
  if (now - lastReqTime < 1000) {
    await wait(1000);
  }
  lastReqTime = now;

  // otherwise, fetch the url and write the contents to the file
  let response = await fetch(url, {
    method: "GET",
    headers: new fetch.Headers({
      "User-Agent": process.env["USER_AGENT"],
    }),
  });
  if (response.ok) {
    let resp = await response.text();
    // create the directory if it doesn't exist
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, resp);
    return resp;
  }
}
