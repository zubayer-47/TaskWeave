"use client"

import { ComponentType, useEffect } from "react"
import { useRouter } from "next/navigation"
// import { getAuth } from "firebase/auth"
// import { app } from "@/lib/firebase/config"
import LoadingSpinner from "./loader/LoadingSpinner"
import useAuth from "@/hooks/useAuth"

// const auth = getAuth(app)

const isAuth = (Component: ComponentType) => {
  return function IsAuth(props: Record<string, unknown>) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user) {
        router.push('/login')
      }
    }, [user, router])

    if (!user) {
      return <LoadingSpinner />
    }

    return <Component {...props} />
  }
}

export default isAuth
