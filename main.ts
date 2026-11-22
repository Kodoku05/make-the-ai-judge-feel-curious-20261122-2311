import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The entry: a short text written to make the AI judge feel curious.
// 276 Unicode code points, inside the 1-280 gate.
const TEXT =
  "The library keeps a shelf for books never returned. One of them, " +
  "salt-stained, its last page torn, has been gone forty years. The " +
  "librarian dusts its empty slot each morning. She never read the " +
  "ending. Neither did the sea. Some stories exist only because nobody " +
  "finished them.";

// Fail closed: never write a text the gate would refuse (1-280 code
// points, not only whitespace). The count is in Unicode code points,
// not bytes and not UTF-16 units.
const points = [...TEXT].length;
if (points < 1 || points > 280 || /^\s*$/.test(TEXT)) {
  throw new Error(`entry text is ${points} code points, outside the 1-280 gate`);
}

const out = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "entry.txt"), TEXT, "utf8");
