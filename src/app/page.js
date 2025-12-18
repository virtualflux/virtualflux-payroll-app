'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function Home() {
  const router = useRouter()

   const accessToken = useSelector(
    (state) => state.user.accessToken
  )
  console.log(accessToken)
  
   useEffect(() => {
    if (accessToken) {
      router.replace('/overview')
    } else {
      router.replace('/login')
    }
  }, [accessToken, router])
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}