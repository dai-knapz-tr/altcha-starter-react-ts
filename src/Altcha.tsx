import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

// Importing altcha package will introduce a new element <altcha-widget>
import 'altcha'

interface AltchaProps {
  onStateChange?: (ev: Event | CustomEvent) => void;
  onVerified?: (ev: Event | CustomEvent, payload: string) => void;
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(({ onStateChange, onVerified }, ref) => {
  const widgetRef = useRef<AltchaWidget & AltchaWidgetMethods & HTMLElement>(null)
  const [value, setValue] = useState<string | null>(null)

  useImperativeHandle(ref, () => {
    return {
      get value() {
        return value
      }
    }
  }, [value])

  useEffect(() => {
    const handleStateChange = (ev: Event | CustomEvent) => {
      if ('detail' in ev) {
        console.debug('Altcha state change:', ev.detail)
        setValue(ev.detail.payload || null)
        onStateChange?.(ev)
      }
    }

    const handleVerified = (ev: Event | CustomEvent) => {
      if ('detail' in ev) {
        onVerified?.(ev, ev.detail.payload || "")
      }
    }

    const { current } = widgetRef

    if (current) {
      current.addEventListener('statechange', handleStateChange)
      current.addEventListener('verified', handleVerified)
      return () => current.removeEventListener('statechange', handleStateChange)
    }
  }, [onStateChange, onVerified])

  const strings = {
    "ariaLinkLabel": "Visit Altcha.org",
    "error": "Verification failed. Try again later.",
    "expired": "Verification expired. Try again.",
    "footer": "Protected by <a href=\"https://altcha.org/\" target=\"_blank\" aria-label=\"Visit Altcha.org\">ALTCHA</a>",
    "label": "I'm not a robot",
    "verified": "Verified, please submit the form.",
    "verifying": "Verifying...",
    "waitAlert": "Verifying... please wait."
  }

  /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/website-integration/#using-altcha-widget  */
  return (
    <>

      <altcha-widget
        ref={widgetRef}
        // style={{
        //   '--altcha-max-width': '100%',
        // }}
        floating="auto"
        debug
        test
        auto="off"
        strings={JSON.stringify(strings)}
      />
    </>
  )
})

export default Altcha
