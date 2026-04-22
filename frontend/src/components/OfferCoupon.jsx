import { useCallback, useState } from 'react'

export function OfferCoupon({ offer }) {
  const [copied, setCopied] = useState(false)

  const copyCode = useCallback(async () => {
    const { code } = offer
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code)
      } else {
        const ta = document.createElement('textarea')
        ta.value = code
        ta.setAttribute('readonly', '')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }, [offer])

  return (
    <article className="offer-coupon" aria-labelledby={`offer-title-${offer.id}`}>
      <div className="offer-coupon__body">
        <span className="offer-coupon__badge">{offer.badge}</span>
        <h2 className="offer-coupon__title" id={`offer-title-${offer.id}`}>
          {offer.title}
        </h2>
        <p className="offer-coupon__desc">{offer.description}</p>
        {offer.expires ? <p className="offer-coupon__expires">Expires {offer.expires}</p> : null}
      </div>
      <div className="offer-coupon__code-side">
        <p className="offer-coupon__code-label">Coupon code</p>
        <p className="offer-coupon__code" aria-live="polite">
          <span className="offer-coupon__code-text">{offer.code}</span>
        </p>
        <button
          type="button"
          className="offer-coupon__copy"
          onClick={copyCode}
          aria-label={copied ? 'Code copied to clipboard' : `Copy coupon code ${offer.code}`}
        >
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
    </article>
  )
}
