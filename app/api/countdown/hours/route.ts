import { NextResponse } from 'next/server'
import { getTimeValues } from '../../../../config/dates'
import sharp from 'sharp'

export async function GET() {
  try {
    const { hours } = getTimeValues()
    
    // Create SVG
    const svg = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="white"/>
        <text 
          x="50" 
          y="50" 
          font-family="Arial" 
          font-size="40" 
          font-weight="bold" 
          fill="black"
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${String(hours).padStart(2, '0')}
        </text>
      </svg>
    `

    // Convert SVG to PNG
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer()

    return new NextResponse(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error generating hours countdown:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

