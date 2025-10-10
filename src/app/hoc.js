'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const withAuth = (WrappedComponent) => {
    const RequiresAuth = (props) => {
        const router = useRouter()
        const { accessToken } = useSelector((state) => state.user)

        useEffect(() => {
            if (!accessToken) {
                router.replace('/login')
            }
        }, [accessToken, router])

        if (!accessToken) {
            return null
        }

        return <WrappedComponent {...props} />
    }

    return RequiresAuth
}

export default withAuth
