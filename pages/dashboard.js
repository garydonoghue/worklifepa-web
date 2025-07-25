import { useSession, signIn } from 'next-auth/react'

export default function Dashboard() {
  const { data: session } = useSession()
  if (!session) {
    return (<p>You must <a onClick={() => signIn()}>sign in</a>.</p>)
  }
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Link your calendars</h1>
      <ul>
        <li><button onClick={() => signIn('google')}>Link Google Calendar</button></li>
        <li><button onClick={() => signIn('azure-ad')}>Link Microsoft 365</button></li>
        <li><button onClick={() => signIn('credentials')}>Link iCloud</button></li>
      </ul>
    </div>
  )
}
