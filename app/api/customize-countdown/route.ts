import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getTimeValues } from '../../../config/dates'
import { PrismaClient } from '@prisma/client'
import sharp from 'sharp'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { color } = await request.json()
    const uniqueId = uuidv4()

    // Store color preference in database
    await prisma.customization.create({
      data: {
        id: uniqueId,
        color: color,
      },
    })

    const { days, hours, minutes, seconds } = getTimeValues()
    
    // Create preview SVG
    const svg = `
      <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="100" fill="white"/>
        <text 
          x="200" 
          y="50" 
          font-family="Arial" 
          font-size="24" 
          font-weight="bold" 
          fill="${color}"
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${days}d ${hours}h ${minutes}m ${seconds}s
        </text>
      </svg>
    `

    // Convert SVG to PNG for preview
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer()

    // Convert buffer to base64 for preview URL
    const previewUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`

    // Generate embed code
    const embedCode = `<img src="https://${process.env.VERCEL_URL}/api/countdown/${uniqueId}" alt="Countdown Timer" width="400" height="100">`

    return NextResponse.json({ uniqueId, previewUrl, embedCode })
  } catch (error) {
    console.error('Error in customize-countdown:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}