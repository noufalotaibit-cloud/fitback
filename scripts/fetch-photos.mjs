// Downloads the licensed event photos from Wikimedia Commons into /public/photos
// so you can serve them from your own domain. Then set `photos: "local"` in config/site.ts.
// Usage: npm run photos
import { readFile, mkdir, writeFile } from "node:fs/promises";

const src = await readFile(new URL("../data/events.ts", import.meta.url), "utf8");
const re = /\{ id: "([^"]+)", file: "([^"]+)", hash: "([^"]+)"/g;
await mkdir(new URL("../public/photos/", import.meta.url), { recursive: true });

for (const [, id, file, hash] of src.matchAll(re)) {
  const name = encodeURIComponent(file).replace(/%28/g, "(").replace(/%29/g, ")");
  const url = `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash}/${name}/960px-${name}`;
  const res = await fetch(url, { headers: { "User-Agent": "SceneDemo/1.0 (university project; photo cache)" } });
  if (!res.ok) { console.error(`✗ ${id}: HTTP ${res.status}`); continue; }
  await writeFile(new URL(`../public/photos/${id}.jpg`, import.meta.url), Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${id}`);
}
