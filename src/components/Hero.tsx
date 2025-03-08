'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchInput } from './ui/search-input'

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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            zIndex: -1
          }}
        />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
          Encontre o Imóvel Perfeito para Alugar
        </h1>
        <p className="text-xl text-white text-center mb-8 max-w-2xl">
          Milhares de opções de casas e apartamentos para alugar em todo o
          Brasil
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <SearchInput
            placeholder="Digite o nome da cidade..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onSelectCity={handleCitySelect}
          />
        </form>
      </div>
    </div>
  )
}
