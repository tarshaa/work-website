"""Build native-resolution, endlessly looping cover GIFs from the source videos."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import subprocess
import tempfile

import imageio_ffmpeg
from PIL import Image

ASSETS = Path(__file__).resolve().parents[1] / 'assets'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
COVERS = {
    'techniques': (1256, 720, 20, 'bayer:bayer_scale=3'),
    'fauna-cover-hd': (800, 928, 20, 'sierra2_4a'),
    'fauna': (1440, 806, 20, 'bayer:bayer_scale=3'),
    'flora-blackfriday-promo': (1336, 1080, 20, 'bayer:bayer_scale=3'),
    'elements-cover': (1280, 800, 20, 'sierra2_4a'),
    'flora-mcp-api': (1920, 1080, 9, 'none'),
    'creative-context-cli': (1142, 1080, 20, 'bayer:bayer_scale=3'),
    'magnolia-assessment': (1822, 720, 20, 'bayer:bayer_scale=3'),
}


def build(item):
    name, (width, height, fps, dither) = item
    output = ASSETS / f'{name}-loop.gif'
    common = [FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', '-threads', '2']
    with tempfile.TemporaryDirectory() as temporary:
        palette = str(Path(temporary) / 'palette.png')
        subprocess.run(common + ['-i', str(ASSETS / f'{name}.mp4'), '-vf',
            'fps=20,palettegen=stats_mode=full', '-frames:v', '1', '-update', '1',
            palette], check=True)
        while True:
            subprocess.run(common + ['-i', str(ASSETS / f'{name}.mp4'), '-i',
                palette, '-filter_complex_threads', '2', '-filter_complex',
                f'[0:v]fps={fps}[v];[v][1:v]paletteuse=dither={dither}:diff_mode=rectangle',
                '-loop', '0', '-an', str(output)], check=True)
            if output.stat().st_size < 100 * 1024 * 1024:
                break
            fps -= 1
            if fps < 6:
                raise ValueError(f'{name} exceeds the hosting limit')
    with Image.open(output) as image:
        assert image.size == (width, height)
        assert image.n_frames > 1 and image.info.get('loop') == 0
    print(f'{name}: {width} x {height}, {fps} fps, {output.stat().st_size / 1e6:.2f} MB', flush=True)


if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=2) as pool:
        list(pool.map(build, COVERS.items()))
