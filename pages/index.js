import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <div style={{ padding: '2rem' }}>
      {!session ? (
        <>
          <h1>Sign in to worklifepa</h1>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      ) : (
        <>
          <h1>Welcome, {session.user.email}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
          <p><a href="/dashboard">Go to Dashboard →</a></p>
        </>
      )}
    </div>
  )
}
