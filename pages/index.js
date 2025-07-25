import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    if (isRegister) {
      // call our signup API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) return alert('Error signing up')
      setIsRegister(false)
    } else {
      signIn('credentials', { email, password })
    }
  }

  if (session) return <p>Signed in as {session.user.email}</p>

  return (
    <div style={{ padding:'2rem' }}>
      <h1>{isRegister ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleAuth}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={()=>setIsRegister(!isRegister)}>
        {isRegister ? 'Have an account? Sign In' : 'New user? Sign Up'}
      </button>
    </div>
  )
}
