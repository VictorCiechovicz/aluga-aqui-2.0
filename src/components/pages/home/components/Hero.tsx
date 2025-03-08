'use client'

import { SearchInput } from '@/components/ui/search-input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/properties?city=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleCitySelect = (cityName: string) => {
    setSearchQuery(cityName)
    router.push(`/properties?city=${encodeURIComponent(cityName.trim())}`)
  }

  return (
    <div className="relative h-[600px] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80" />

      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6">
            Encontre o Imóvel Perfeito para Você
          </h1>
          <p className="text-xl mb-8">
            Milhares de opções de aluguel em todo o Brasil. Encontre seu próximo
            lar com facilidade e segurança.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <SearchInput
              placeholder="Buscar imóvel por cidade"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onSelectCity={handleCitySelect}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
