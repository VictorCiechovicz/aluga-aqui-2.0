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
        className={cn('pl-10 h-14 text-base rounded-full shadow-sm', className)}
        value={value}
        onChange={onChange}
        onFocus={() => setShowSuggestions(true)}
        {...props}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

      {showSuggestions && (value || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border overflow-hidden">
          {suggestions.length === 0 && value ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              Nenhuma cidade encontrada
            </div>
          ) : (
            suggestions.map(city => (
              <button
                key={`${city.name}-${city.state}`}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => handleCitySelect(city)}
                type="button"
              >
                <span className="text-gray-600">{city.name}</span>
                <span className="text-sm text-gray-400">- {city.state}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
