import { NextResponse } from 'next/server';
import { createCanvas } from 'canvas';
import GifEncoder from 'gif-encoder-2';
import { getTimeDifference } from '../../../../config/dates';
import { countdownStyles } from '../../../../config/countdownStyles';

export async function GET() {
  try {
    const { containerSize, backgroundColor, textColor, fontSize, fontFamily, fontWeight, textAlign, textBaseline } = countdownStyles;
    
    const canvas = createCanvas(containerSize, containerSize);
    const ctx = canvas.getContext('2d');

    const gif = new GifEncoder(containerSize, containerSize);
    gif.setDelay(1000);
    gif.setRepeat(0);
    gif.setQuality(10);
    gif.start();

    const diff = getTimeDifference();
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const text = hours.toString().padStart(2, '0');

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, containerSize, containerSize);

    // Set text properties
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = textColor;

    // Draw text
    ctx.fillText(text, containerSize / 2, containerSize / 2);

    // Add frame to GIF
    gif.addFrame(ctx);
    gif.finish();

    const buffer = gif.out.getData();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, max-age=0',
      },
    });

  } catch (error) {
    console.error('Error generating hours countdown GIF:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Error generating hours countdown', 
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

