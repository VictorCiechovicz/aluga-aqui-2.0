'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/auth/')

  // Não renderizar o Footer nas páginas de autenticação
  if (isAuthPage) return null

  return (
    <footer className="border-t py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Carreiras
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Imprensa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Anunciantes</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Como Anunciar
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Planos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Dicas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Redes Sociais</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-700">
          <p>
            © {new Date().getFullYear()} Aluga Aqui. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
