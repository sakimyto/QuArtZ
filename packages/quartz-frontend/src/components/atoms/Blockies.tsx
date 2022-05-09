import { NextPage } from 'next';
import { memo, useEffect, useMemo, useRef } from 'react';

// NOTE -- This code is referenced from: https://github.com/stephensprinkle-zz/react-blockies/pull/1/files

// The random number is a js implementation of the Xorshift PRNG
function seedrand(seed: string) {
  const randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

  for (let i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }

  // based on Java's String.hashCode(), expanded to 4 32bit values
  return function random() {
    const t = randseed[0] ^ (randseed[0] << 11);

    randseed[0] = randseed[1];
    randseed[1] = randseed[2];
    randseed[2] = randseed[3];
    randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

    return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
  };
}

function createColor(random: () => number) {
  // saturation is the whole color spectrum
  const h = Math.floor(random() * 360);
  // saturation goes from 40 to 100, it avoids greyish colors
  const s = random() * 60 + 40 + '%';
  // lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
  const l = (random() + random() + random() + random()) * 25 + '%';

  const color = 'hsl(' + h + ',' + s + ',' + l + ')';
  return color;
}

function createImageData(size: number, random: () => number) {
  const width = size; // Only support square icons for now
  const height = size;

  const dataWidth = Math.ceil(width / 2);
  const mirrorWidth = width - dataWidth;

  const data = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < dataWidth; x++) {
      // this makes foreground and background color to have a 43% (1/2.3) probability
      // spot color has 13% chance
      row[x] = Math.floor(random() * 2.3);
    }
    const r = row.slice(0, mirrorWidth);
    r.reverse();
    row = row.concat(r);

    for (let i = 0; i < row.length; i++) {
      data.push(row[i]);
    }
  }

  return data;
}

type DrawCanvas = {
  imageData: number[];
  color: string;
  bgColor: string;
  spotColor: string;
};

function drawCanvas(
  canvas: HTMLCanvasElement | null,
  scale: number,
  { imageData, color, bgColor, spotColor }: DrawCanvas
) {
  const width = Math.sqrt(imageData.length);
  const size = width * scale;

  if (canvas) {
    canvas.width = size;
    canvas.style.width = `${size}px`;

    canvas.height = size;
    canvas.style.height = `${size}px`;

    const cc = canvas.getContext('2d');

    if (cc) {
      cc.fillStyle = bgColor;
      cc.fillRect(0, 0, canvas.width, canvas.height);
      cc.fillStyle = color;

      for (let i = 0; i < imageData.length; i++) {
        // if data is 2, choose spot color, if 1 choose foreground
        cc.fillStyle = imageData[i] === 1 ? color : spotColor;

        // if data is 0, leave the background
        if (imageData[i]) {
          const row = Math.floor(i / width);
          const col = i % width;

          cc.fillRect(col * scale, row * scale, scale, scale);
        }
      }
    }
  }
}

type GenerateIdenticon = {
  bgColor: string | undefined;
  color: string | undefined;
  seed: string;
  size: number;
  spotColor: string | undefined;
};

function generateIdenticon({ bgColor, color, seed, size, spotColor }: GenerateIdenticon) {
  const random = seedrand(seed);

  // order matters since we are using random()
  if (!color) color = createColor(random);
  if (!bgColor) bgColor = createColor(random);
  if (!spotColor) spotColor = createColor(random);

  return {
    bgColor,
    color,
    imageData: createImageData(size, random),
    spotColor,
  };
}

type IdenticonProps = {
  bgColor?: string;
  className?: string;
  color?: string;
  scale?: number;
  seed: string;
  size?: number;
  spotColor?: string;
};

const Identicon: NextPage<IdenticonProps> = memo(function Identicon({
  bgColor,
  className,
  color,
  scale = 4,
  seed = Math.floor(Math.random() * Math.pow(10, 16)).toString(16),
  size = 6,
  spotColor,
  ...props
}: IdenticonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>();

  // Cache identiconData so we can use it to trigger a redraw.
  const identiconData = useMemo(
    () =>
      generateIdenticon({
        bgColor,
        color,
        seed,
        size,
        spotColor,
      }),
    [bgColor, color, seed, size, spotColor]
  );

  // Redraw when scale or identiconData updates.
  useEffect(() => {
    if (canvasRef.current) {
      drawCanvas(canvasRef.current, scale, identiconData);
    }
  }, [identiconData, scale]);

  return (
    <canvas
      ref={(canvas) => {
        canvasRef.current = canvas;

        // Redraw when the ref updates.
        if (canvas) {
          drawCanvas(canvas, scale, identiconData);
        }
      }}
      className={className}
      {...props}
    />
  );
});

export default Identicon;
