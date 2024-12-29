import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { createCanvas } from 'canvas'
import GifEncoder from 'gif-encoder-2'
import { getTimeValues } from '../../../config/dates'
import { PrismaClient } from '@prisma/client'

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

    // Generate preview image
    const previewUrl = await generatePreviewImage(color)

    // Generate embed code
    const embedCode = `<img src="https://${process.env.VERCEL_URL}/api/countdown/${uniqueId}" alt="Countdown Timer" width="400" height="100">`

    return NextResponse.json({ uniqueId, previewUrl, embedCode })
  } catch (error) {
    console.error('Error in customize-countdown:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

async function generatePreviewImage(color: string): Promise<string> {
  const canvas = createCanvas(400, 100)
  const ctx = canvas.getContext('2d')
  const { days, hours, minutes, seconds } = getTimeValues()

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, 400, 100)

  ctx.font = 'bold 24px Arial'
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const text = `${days}d ${hours}h ${minutes}m ${seconds}s`
  ctx.fillText(text, 200, 50)

  return canvas.toDataURL()
}

