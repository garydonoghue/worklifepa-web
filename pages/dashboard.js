import { useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { data: session } = useSession()
  const [links, setLinks] = useState({ personal: [], work: [] })

  useEffect(() => {
    if (session) {
      fetch('/api/accounts')
        .then(res => res.json())
        .then(data => setLinks(data))
    }
  }, [session])

  if (!session) return <p>You must sign in.</p>

  const isLinked = (type, provider) => links[type]?.includes(provider)
  const button = (prov, label, type) => (
    <button onClick={() => signIn(prov)} disabled={isLinked(type, prov)}>
      {isLinked(type, prov) ? `${label} Connected` : `Link ${label}`}
    </button>
  )

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Manage Calendar Links</h1>

      <h2>Personal</h2>
      {button('google',      'Gmail',            'personal')}
      {button('azure-ad',    'Outlook',          'personal')}
      {button('credentials', 'iCloud',           'personal')}

      <h2>Work</h2>
      {button('google',      'Google Workspace', 'work')}
      {button('azure-ad',    'Microsoft 365',    'work')}
    </div>
  )
}
