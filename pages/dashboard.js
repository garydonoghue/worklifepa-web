import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session } = useSession()
  if (!session) return <p>Please sign in first.</p>
  return (
    <div style={{ padding:'2rem' }}>
      <h1>Welcome, {session.user.email}</h1>
      <p>Your account is now secured with email/password.</p>
      {/* Next: calendar linking UI goes here */}
    </div>
  )
}
