import React from 'react'

export default function Auth() {
  return (
    <div className="flex flex-col gap-7 items-center h-screen select-none pt-44">
      <div className="text-center space-y-5">
        <h1 className="text-primary-foreground font-adlam-display text-6xl">
          Sign In
        </h1>

        <span className="font-adlam-display text-xl">
          Authenticate to manage your project efficiently
        </span>

      </div>
      <span className="font-adlam-display text-xl">
        Sign In with Google
      </span>
    </div>
  )
}
