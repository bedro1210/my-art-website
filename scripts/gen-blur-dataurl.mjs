import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");

function toDataURL(buffer, mime) {
  const b64 = buffer.toString("base64");
  return `data:${mime};base64,${b64}`;
}

async function run() {
  const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  for (const f of files) {
    const p = path.join(IMAGES_DIR, f);
    const img = sharp(p).resize(24).jpeg({ quality: 60 }); // 작은 썸네일
    const buf = await img.toBuffer();
    const dataURL = toDataURL(buf, "image/jpeg");
    console.log(f, "=>", dataURL);
  }
}
run();
