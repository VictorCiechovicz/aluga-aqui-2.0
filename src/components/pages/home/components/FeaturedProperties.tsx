'use client'

import { PropertyCard } from '@/components/pages/home/components/PropertyCard'

interface Property {
  id: string
  title: string
  price: number
  address: string
  city: string
  bedrooms: number
  bathrooms: number
  area: number
  imageUrl: string
}

interface FeaturedPropertiesProps {
  properties: Property[]
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Imóveis em Destaque
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map(property => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  )
}
