import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  // Optional: detect first-time users and redirect to an onboarding page
  useEffect(() => {
    if (session && session.user.isNewUser) {
      router.push('/welcome')
    }
  }, [session])

  return (
    <div style={{ padding: '2rem' }}>
      {!session ? (
        <>        
          <h1>Welcome to worklifepa</h1>
          <p>Sign in or create a new account via one of the providers below:</p>
          <button onClick={() => signIn('google')}>Google</button>
          <button onClick={() => signIn('azure-ad')}>Microsoft</button>
          <button onClick={() => signIn('credentials')}>iCloud</button>
        </>
      ) : (
        <>  
          <h1>Hello, {session.user.email}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
          <p><a href="/dashboard">Go to Dashboard →</a></p>
        </>
      )}
    </div>
  )
}
