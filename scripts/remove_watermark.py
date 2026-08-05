"""Remove the Gemini sparkle watermark from a generated video.

Uses ffmpeg's `delogo` filter to interpolate the watermark region from
surrounding pixels, then re-encodes for web delivery (H.264 + AAC, faststart).

Usage:
    python scripts/remove_watermark.py <input.mp4> [output.mp4]
"""

import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg

# Bounding box around the watermark (bottom-right sparkle icon), in source
# pixels, measured on a 1280x720 frame. Padded a few px beyond the glyph
# itself so delogo has clean surrounding pixels to blend from.
WATERMARK_BOX = {"x": 1130, "y": 565, "w": 70, "h": 70}


def remove_watermark(input_path: Path, output_path: Path) -> None:
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    box = WATERMARK_BOX
    delogo = f"delogo=x={box['x']}:y={box['y']}:w={box['w']}:h={box['h']}:show=0"

    cmd = [
        ffmpeg,
        "-y",
        "-i", str(input_path),
        "-vf", delogo,
        "-c:v", "libx264",
        "-crf", "20",
        "-preset", "slow",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        str(output_path),
    ]
    subprocess.run(cmd, check=True)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    src = Path(sys.argv[1]).resolve()
    dst = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else src.with_name(f"{src.stem}-clean{src.suffix}")

    remove_watermark(src, dst)
    print(f"Wrote {dst}")
