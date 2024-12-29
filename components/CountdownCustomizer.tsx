'use client'

import { useState, useCallback } from 'react'
import { debounce } from 'lodash'
import Image from 'next/image'

export default function CountdownCustomizer() {
  const [color, setColor] = useState('#000000')
  const [previewUrl, setPreviewUrl] = useState('')
  const [embedCode, setEmbedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  const generateCustomCountdown = useCallback(
    debounce(async (color: string) => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch('/api/customize-countdown', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ color })
        })
        if (!response.ok) throw new Error('Customization failed')
        const { previewUrl, embedCode } = await response.json()
        setPreviewUrl(previewUrl)
        setEmbedCode(embedCode)
      } catch (err) {
        console.error('Error generating custom countdown:', err)
        setError('Failed to generate custom countdown. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }, 500),
    []
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateCustomCountdown(color)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Customize Countdown</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="colorPicker" className="block text-sm font-medium text-gray-700">
            Choose Color
          </label>
          <input
            type="color"
            id="colorPicker"
            value={color}
            onChange={handleColorChange}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label htmlFor="hexColor" className="block text-sm font-medium text-gray-700">
            Hex Color
          </label>
          <input
            type="text"
            id="hexColor"
            value={color}
            onChange={handleColorChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Custom Countdown'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {previewUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <Image src={previewUrl} alt="Custom Countdown Preview" width={400} height={100} className="w-full" />
        </div>
      )}
      {embedCode && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Embed Code</h3>
          <textarea
            readOnly
            value={embedCode}
            className="w-full h-24 p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}
    </div>
  )
}

