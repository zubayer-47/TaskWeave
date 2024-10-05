"use client"

import { ComponentType, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "./loader/LoadingSpinner"
import useAuth from "@/hooks/useAuth"

const isGuestRoute = (Component: ComponentType) => {
  return function IsGuestRoute(props: Record<string, unknown>) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (user) {
        router.push('/dashboard')
      }
    }, [user, router])

    if (user) {
      return <LoadingSpinner />
    }

    return <Component {...props} />
  }
}

export default isGuestRoute
