import { NextResponse } from 'next/server'
import { createCanvas } from 'canvas'
import GifEncoder from 'gif-encoder-2'
import { getTimeValues } from '../../../../config/dates'
import { PrismaClient } from '@prisma/client'

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

    const gif = await generateCountdownGif(customization.color)

    return new NextResponse(gif, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error in countdown generation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

async function generateCountdownGif(color: string): Promise<Buffer> {
  const canvas = createCanvas(400, 100)
  const ctx = canvas.getContext('2d')
  const gif = new GifEncoder(400, 100)
  gif.start()
  gif.setRepeat(0)
  gif.setDelay(1000)
  gif.setQuality(10)

  for (let i = 0; i < 60; i++) {
    const { days, hours, minutes, seconds } = getTimeValues()

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 400, 100)

    ctx.font = 'bold 24px Arial'
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const text = `${days}d ${hours}h ${minutes}m ${seconds}s`
    ctx.fillText(text, 200, 50)

    gif.addFrame(ctx)
  }

  gif.finish()
  return gif.out.getData()
}

