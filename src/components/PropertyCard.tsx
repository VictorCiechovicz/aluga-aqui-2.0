import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Building2, Bath, Ruler } from 'lucide-react'

interface PropertyCardProps {
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

export function PropertyCard({
  id,
  title,
  price,
  address,
  city,
  bedrooms,
  bathrooms,
  area,
  imageUrl
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-2xl font-bold text-blue-600">
            R$ {price.toLocaleString('pt-BR')}
          </p>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 mb-4">
            {address}, {city}
          </p>

          <div className="flex items-center gap-4 text-gray-700">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>{bedrooms} quartos</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms} banheiros</span>
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              <span>{area}m²</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
