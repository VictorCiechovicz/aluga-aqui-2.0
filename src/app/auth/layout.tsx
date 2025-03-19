import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Autenticação - Aluga Aqui',
  description: 'Faça login ou cadastre-se na plataforma Aluga Aqui'
}

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${inter.className} min-h-screen bg-gradient-to-b from-blue-50 to-white`}
    >
      {children}
      <div className="absolute bottom-4 w-full text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Aluga Aqui. Todos os direitos reservados.
      </div>
    </div>
  )
}
