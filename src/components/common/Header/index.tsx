'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'

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
          <Button
            variant="outline"
            className={
              isHome
                ? 'border-white text-white hover:bg-white/10'
                : 'border-indigo-600 text-indigo-700 hover:bg-indigo-50'
            }
            onClick={() => router.push('/properties/register')}
          >
            Anunciar Imóvel
          </Button>
          <Button
            className={
              isHome
                ? 'bg-white text-indigo-700 hover:bg-gray-100'
                : 'bg-indigo-700 text-white hover:bg-indigo-800'
            }
          >
            Entrar
          </Button>
        </nav>
      </div>
    </header>
  )
}
