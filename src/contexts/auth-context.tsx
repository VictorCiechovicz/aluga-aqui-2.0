'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface RegisterUserData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  terms?: boolean
  confirmPassword?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: RegisterUserData) => Promise<void>
  hasRestrictedAccess: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [hasRestrictedAccess, setHasRestrictedAccess] = useState<boolean>(false)

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    // Verificar se há um usuário armazenado no localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
      setHasRestrictedAccess(false)
    } else {
      // Verificar se o acesso está restrito
      const restrictedAccess =
        localStorage.getItem('restrictedAccess') === 'true'
      setHasRestrictedAccess(restrictedAccess)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulando uma chamada de API de login (substitua por uma chamada real no futuro)
      // Na implementação real, você faria uma chamada à API aqui
      console.log('Login com:', email, password)

      // Simulando um usuário retornado pela API
      const userData = {
        id: '1',
        name: 'Usuário Teste',
        email
      }

      // Salvar os dados do usuário
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userData))

      // Redirecionar para a página inicial (implementar na chamada real)
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setHasRestrictedAccess(true)
    localStorage.removeItem('user')
    localStorage.setItem('restrictedAccess', 'true')
    // Acesso restrito após logout
  }

  const register = async (userData: RegisterUserData) => {
    try {
      // Simulando uma chamada de API de registro
      console.log('Registrando usuário:', userData)

      // Simulando registro bem-sucedido e login automático
      const newUser = {
        id: '1',
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email
      }

      setUser(newUser)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(newUser))

      // Redirecionar para a página inicial
    } catch (error) {
      console.error('Erro ao registrar:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        hasRestrictedAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
