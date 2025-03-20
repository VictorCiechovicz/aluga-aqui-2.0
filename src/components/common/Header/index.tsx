'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useEffect } from 'react'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user, logout, hasRestrictedAccess } = useAuth()

  const isHome = pathname === '/'
  const isAuthPage = pathname.startsWith('/auth/')
  const isPropertiesPage =
    pathname.startsWith('/properties') && !pathname.includes('/register')
  const isPropertyDetailPage = pathname.match(/^\/properties\/[^\/]+$/) !== null

  // Check if current path is restricted
  useEffect(() => {
    if (hasRestrictedAccess) {
      // If user has restricted access and is trying to access a restricted page
      const isRestrictedRoute =
        !isHome && !isPropertiesPage && !isPropertyDetailPage && !isAuthPage

      if (isRestrictedRoute) {
        // Redirect to home if current page is restricted
        router.push('/')
      }
    }
  }, [
    hasRestrictedAccess,
    isHome,
    isPropertiesPage,
    isPropertyDetailPage,
    isAuthPage,
    pathname,
    router
  ])

  // Não renderizar o Header nas páginas de autenticação
  if (isAuthPage) return null

  const handleNavigation = (route: string) => {
    console.log(route)
    console.log(hasRestrictedAccess)

    // Sempre permitir navegação para rotas de autenticação
    if (route.startsWith('/auth/')) {
      router.push(route)
      return
    }

    // Verificar restrições para outras rotas
    if (
      hasRestrictedAccess &&
      !route.startsWith('/properties') &&
      route !== '/'
    ) {
      router.push('/')
      return
    }

    // Check if it's a property detail page (e.g., /properties/1)
    const isPropertyDetailLink = route.match(/^\/properties\/[^\/]+$/) !== null

    // Prevent navigation to register property page if access is restricted
    if (
      hasRestrictedAccess &&
      route.includes('/register') &&
      !isPropertyDetailLink
    ) {
      router.push('/properties')
      return
    }

    router.push(route)
  }

  return (
    <header
      className={`w-full z-10 ${isHome ? 'absolute' : 'bg-white border-b'}`}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-bold ${
            isHome ? 'text-white' : 'text-indigo-700'
          }`}
        >
          Aluga Aqui
        </Link>
        <nav className="flex items-center gap-4">
          {isAuthenticated && isHome && !hasRestrictedAccess && (
            <Button
              className="bg-white text-indigo-700 hover:bg-gray-100"
              onClick={() => handleNavigation('/properties/register')}
            >
              Anunciar Imóvel
            </Button>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span
                className={`${
                  isHome ? 'text-white' : 'text-gray-700'
                } text-sm hidden md:inline`}
              >
                Olá, {user?.name.split(' ')[0]}
              </span>
              <Button
                variant="ghost"
                className={`${
                  isHome
                    ? 'text-white border-white hover:bg-white/10'
                    : 'text-indigo-700 border-indigo-700 hover:bg-indigo-50'
                }`}
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          ) : (
            <>
              <Button
                className="bg-white text-indigo-700 hover:bg-gray-100"
                onClick={() => handleNavigation('/auth/login')}
              >
                Entrar
              </Button>
              <Button
                className={`${
                  isHome
                    ? 'bg-indigo-700 text-white hover:bg-indigo-800'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
                onClick={() => handleNavigation('/auth/register')}
              >
                Cadastrar
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
