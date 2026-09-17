import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router keeps the scroll position across navigations, which reads as a
 * broken page when moving between long documents. Reset it on every path change
 * — but leave hash links alone so in-page anchors still work.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
