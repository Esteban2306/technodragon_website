'use client'

import { createContext, useContext } from 'react'
import { useMe, useLogin, useLogout, useRegister } from '../hooks/useAuth'

type AuthContextType = {
  user: any
  isLoading: boolean
  login: ReturnType<typeof useLogin>
  register: ReturnType<typeof useRegister>
  logout: ReturnType<typeof useLogout>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useMe()

  const login = useLogin()
  const register = useRegister()
  const logout = useLogout()

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}