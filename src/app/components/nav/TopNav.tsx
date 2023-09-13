'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@service/Auth'

const TopNav = () => {
  const router = useRouter();
  const logout = () => {
    try {
      AuthService.logout(router)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="sticky">
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default TopNav