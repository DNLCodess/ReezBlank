'use client'

import { useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'

export default function AuthProvider({ children }) {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return children
}