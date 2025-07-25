import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <div style={{ padding: '2rem' }}>
      {!session ? (
        <>
          <h1>Welcome to worklifepa</h1>
          <p>Sign in or sign up:</p>
          <button onClick={() => signIn('google')}>Google</button>
          <button onClick={() => signIn('azure-ad')}>Microsoft</button>
          <button onClick={() => signIn('credentials')}>iCloud</button>
        </>
      ) : (
        <>
          <h1>Hello, {session.user.name || session.user.email}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
          <p><a href="/dashboard">Go to Dashboard →</a></p>
        </>
      )}
    </div>
  )
}
