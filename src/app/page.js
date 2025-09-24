'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is logged in (you can implement this logic)
    const isLoggedIn = localStorage.getItem('user') // or however you track auth
    
    if (isLoggedIn) {
      router.push('/overview') // or whatever your main dashboard route is
    } else {
      router.push('/login')
    }
  }, [router])
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}