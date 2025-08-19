import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");
const MARK = "© Choi Mijin"; // 문구 변경 가능

async function watermarkOne(src, dest) {
  const base = sharp(src);
  const { width } = await base.metadata();

  // 워터마크 PNG 텍스트 이미지 생성
  const fontSize = Math.round((width || 1200) * 0.025); // 폭 대비 2.5%
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${fontSize*3}">
      <text x="${width - fontSize*1.5}" y="${fontSize*2}" font-size="${fontSize}" text-anchor="end"
            font-family="Arial, sans-serif" fill="rgba(255,255,255,0.85)" stroke="rgba(0,0,0,0.4)" stroke-width="2">
        ${MARK}
      </text>
    </svg>`
  );

  const wm = await sharp(svg).png().toBuffer();

  await base
    .composite([{ input: wm, gravity: "southeast", blend: "over" }])
    .toFile(dest);
}

async function run() {
  const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  fs.mkdirSync(path.join(IMAGES_DIR, "wm"), { recursive: true });
  for (const f of files) {
    const src = path.join(IMAGES_DIR, f);
    const dest = path.join(IMAGES_DIR, "wm", f);
    await watermarkOne(src, dest);
    console.log("watermarked:", f);
  }
}
run();
