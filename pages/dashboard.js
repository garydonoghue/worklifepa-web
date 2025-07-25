import { useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { data: session } = useSession()
  const [providers, setProviders] = useState([])

  useEffect(() => {
    if (session) {
      fetch('/api/accounts')
        .then(r => r.json())
        .then(data => setProviders(data.providers))
    }
  }, [session])

  if (!session) {
    return (<p>You must <button onClick={() => signIn()}>sign in</button>.</p>)
  }

  const connected = (provider) => providers.includes(provider)

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Link your calendars</h1>

      <h2>Personal Calendar</h2>
      <ul>
        <li>
          <button
            onClick={() => signIn('google')}
            disabled={connected('google')}
          >
            {connected('google') ? 'Gmail Connected' : 'Link Gmail Calendar'}
          </button>
        </li>
        <li>
          <button
            onClick={() => signIn('microsoft')}
            disabled={connected('microsoft')}
          >
            {connected('microsoft') ? 'Outlook Connected' : 'Link Outlook Calendar'}
          </button>
        </li>
        <li>
          <button
            onClick={() => signIn('credentials')}
            disabled={connected('credentials')}
          >
            {connected('credentials') ? 'iCloud Connected' : 'Link iCloud Calendar'}
          </button>
        </li>
      </ul>

      <h2>Work Calendar</h2>
      <ul>
        <li>
          <button
            onClick={() => signIn('google')}
            disabled={connected('google')}
          >
            {connected('google') ? 'Google Workspace Connected' : 'Link Google Workspace'}
          </button>
        </li>
        <li>
          <button
            onClick={() => signIn('azure-ad')}
            disabled={connected('azure-ad')}
          >
            {connected('azure-ad') ? 'Microsoft 365 Connected' : 'Link Microsoft 365'}
          </button>
        </li>
      </ul>
    </div>
  )
}
