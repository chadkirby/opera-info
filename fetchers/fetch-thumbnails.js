import fs from "fs";
import path from "path";
import URL from "url";
import fetch from "node-fetch";
import { promisify } from "util";

const wait = promisify(setTimeout);

const operas = JSON.parse(fs.readFileSync("./src/opera-list.json", "utf8"));

async function getThumbs() {
  for (const { composerThumbnail, composerHref } of operas) {
    if (composerThumbnail) {
      const url = URL.parse(composerThumbnail.source);
      const ext = path.extname(url.pathname).toLowerCase();
      const filename = `./public/composers/${decodeURIComponent(
        composerHref.split("/").pop()
      ).replace("_(composer)", "")}${ext}`;
      if (!fs.existsSync(filename)) {
        await wait(1000);
        const response = await fetch(composerThumbnail.source, {
          method: "GET",
          headers: new fetch.Headers({
            "User-Agent": "OperadleBot/0.0 (operadle@ckky.net)",
          }),
        });
        const buffer = Buffer.from(await response.arrayBuffer());
        if (!response.headers.get("content-type").includes("image")) {
          console.log(`${composer} is not an image`);
          continue;
        }
        fs.writeFileSync(filename, buffer);
        console.log(`${path.basename(filename)} fetched`);
      }
    }
  }
}

getThumbs();
