export const dynamic = 'force-dynamic'

import { useSession, signIn } from 'next-auth/react'
import { useRouter }          from 'next/router'
import { useEffect }          from 'react'

export default function Setup() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      router.push('/dashboard')
    }
  }, [session])

  if (!session) return <p>Loading...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {session.user.name || session.user.email}!</h1>
      <p>Please link your calendars:</p>
      <button onClick={() => signIn('google')}>Link Personal (Gmail)</button>
      <button onClick={() => signIn('azure-ad')}>Link Work (Microsoft 365)</button>
      <button onClick={() => signIn('credentials')}>Link Personal (iCloud)</button>
    </div>
  )
}
