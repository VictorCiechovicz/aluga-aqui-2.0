import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from './input'
import { cn } from '@/lib/utils'
import { fetchCities } from '@/services/ibge'
import type { City } from '@/services/ibge'
import { useState, useEffect } from 'react'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
  onSelectCity?: (cityName: string) => void
}

export function SearchInput({
  className,
  containerClassName,
  value = '',
  onChange,
  onSelectCity,
  placeholder,
  ...props
}: SearchInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<City[]>([])

  useEffect(() => {
    const searchCities = async () => {
      if (!value) {
        setSuggestions([])

        return
      }

      try {
        const cities = await fetchCities(String(value))
        setSuggestions(cities)
      } catch (error) {
        console.error('Error fetching cities:', error)
        setSuggestions([])
      }
    }

    const debounceTimer = setTimeout(searchCities, 300)
    return () => clearTimeout(debounceTimer)
  }, [value])

  const handleCitySelect = (city: City) => {
    onSelectCity?.(`${city.name} - ${city.state}`)
    setShowSuggestions(false)
  }

  return (
    <div className={cn('relative', containerClassName)}>
      <Input
        className={cn(
          'pl-10 h-14 text-base rounded-xl border-zinc-200 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:text-zinc-800 transition-all bg-white',
          className
        )}
        value={value}
        onChange={onChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
        {...props}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-700" />

      {showSuggestions && (value || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden max-h-[280px] overflow-y-auto">
          {suggestions.length === 0 && value ? (
            <div className="px-4 py-3 text-sm text-zinc-600 bg-zinc-50">
              Nenhuma cidade encontrada
            </div>
          ) : (
            suggestions.map(city => (
              <button
                key={`${city.name}-${city.state}`}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-2 transition-colors border-b border-zinc-100 last:border-none"
                onClick={() => handleCitySelect(city)}
                type="button"
              >
                <span className="text-zinc-800 font-medium">{city.name}</span>
                <span className="text-sm text-zinc-500">- {city.state}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
