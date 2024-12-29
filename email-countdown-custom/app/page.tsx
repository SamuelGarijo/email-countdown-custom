import Link from 'next/link'
import LiveCountdown from '../components/LiveCountdown'
import CanvasPreview from '../components/CanvasPreview'
import CountdownCustomizer from '../components/CountdownCustomizer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="w-full flex justify-center mt-4 mb-8">
        <Link href="/email-preview" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ver Email Preview
        </Link>
      </div>
      <div className="mb-8 bg-gray-900 rounded-lg">
        <h2 className="text-white text-center text-lg font-semibold p-4">Canvas Preview</h2>
        <CanvasPreview />
      </div>
      <LiveCountdown />
      <CountdownCustomizer />
    </main>
  )
}

