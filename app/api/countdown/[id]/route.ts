import { NextResponse } from 'next/server'
import { getTimeValues } from '../../../../config/dates'
import { PrismaClient } from '@prisma/client'
import sharp from 'sharp'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Retrieve color preference from database
    const customization = await prisma.customization.findUnique({
      where: { id: id },
    })

    if (!customization) {
      return NextResponse.json({ error: 'Customization not found' }, { status: 404 })
    }

    const { days, hours, minutes, seconds } = getTimeValues()
    
    // Create an SVG with the countdown
    const svg = `
      <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="100" fill="white"/>
        <text 
          x="200" 
          y="50" 
          font-family="Arial" 
          font-size="24" 
          font-weight="bold" 
          fill="${customization.color}"
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${days}d ${hours}h ${minutes}m ${seconds}s
        </text>
      </svg>
    `

    // Convert SVG to PNG using sharp
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
    console.error('Error in countdown generation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}