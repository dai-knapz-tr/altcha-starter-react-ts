import { useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Altcha from './Altcha'
import './App.css'

function App() {
  const altchaRef = useRef<HTMLInputElement>(null)

  const handleVerified = (ev: Event | CustomEvent, payload: string) => {
    ev.preventDefault()
    formSubmit(payload)
  }

  const handleStateChange = (ev: Event | CustomEvent) => {
    console.group('Altcha state change:', ev)
    console.log('Altcha payload:', altchaRef.current?.value)
    console.groupEnd()
  }

  const formSubmit = (payload: string) => {
    console.group('Form submitted!')
    console.log('Altcha payload:', altchaRef.current?.value)
    console.log('Altcha payload (event):', payload)
    console.groupEnd()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // formSubmit()
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <form action="#" method='post' onSubmit={handleSubmit}>
        <fieldset>
          <label>Name:</label>
          <input type="text" name="name" />
        </fieldset>

        <fieldset>
          <label>Message:</label>
          <textarea name="message"></textarea>
        </fieldset>

        <fieldset>

          <Altcha
            ref={altchaRef}
            onStateChange={handleStateChange}
            onVerified={handleVerified}
          />

        </fieldset>

        <button type="submit">Submit</button>
      </form>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
