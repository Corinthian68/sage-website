import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Sage — by Cognition & Chaos";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const emblemData = await readFile(
    join(process.cwd(), "public/images/sage-emblem-og.png"),
    "base64"
  );
  const emblemSrc = `data:image/png;base64,${emblemData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0d14",
        }}
      >
        <img src={emblemSrc} width={340} height={340} />
      </div>
    ),
    { ...size }
  );
}
