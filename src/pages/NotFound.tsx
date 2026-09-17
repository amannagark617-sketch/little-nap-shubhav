import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRight } from '../components/Icons'
import Aurora from '../components/Aurora'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Little Nap Subhav India Pvt. Ltd.'
  }, [])

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <Aurora tone="azure" intensity="subtle" />
      <div className="container-page relative text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-5 font-display text-4xl text-navy-900 sm:text-5xl">
          That page has reclined out of view.
        </h1>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-navy-500">
          The link may be old, or the page may have moved. The catalogue and the
          factory tour are both still where you left them.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to home
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/products" className="btn-outline">
            Browse products
          </Link>
        </div>
      </div>
    </section>
  )
}
