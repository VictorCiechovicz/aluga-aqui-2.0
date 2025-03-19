'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Building2, Bath, Ruler, MapPin, Calendar, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

// This would be fetched from an API in a real application
const properties = [
  {
    id: '1',
    title: 'Casa Moderna com Jardim',
    price: 2500,
    address: 'Rua das Flores, 123',
    neighborhood: 'Jardim Europa',
    city: 'São Paulo',
    zipCode: '01000-000',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    description:
      'Linda casa moderna com amplo jardim, localizada em região tranquila e arborizada. Possui 3 quartos espaçosos, sendo 1 suíte, sala de estar e jantar integradas, cozinha planejada e área de lazer com churrasqueira. Perto de escolas, comércios e parques.',
    propertyType: 'Casa',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc'
    ],
    availableFrom: '2023-08-15'
  },
  {
    id: '2',
    title: 'Apartamento no Centro',
    price: 1800,
    address: 'Av. Paulista, 1000',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    zipCode: '01310-000',
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    description:
      'Excelente apartamento no coração da cidade, com vista panorâmica. Apartamento recém reformado, com 2 quartos, sala ampla, cozinha americana e lavanderia. Prédio com portaria 24h, academia e lavanderia coletiva. Próximo ao metrô, restaurantes e centros comerciais.',
    propertyType: 'Apartamento',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0c2'
    ],
    availableFrom: '2023-07-01'
  },
  {
    id: '3',
    title: 'Casa com Piscina',
    price: 3500,
    address: 'Rua dos Lagos, 456',
    neighborhood: 'Barra da Tijuca',
    city: 'Rio de Janeiro',
    zipCode: '22640-100',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    description:
      'Espaçosa casa com piscina e área de lazer completa. A casa possui 4 quartos, sendo 2 suítes, sala de estar e jantar, cozinha ampla, área gourmet com churrasqueira e piscina. Condomínio fechado com segurança 24h, próximo a praias, shoppings e supermercados.',
    propertyType: 'Casa',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1617104678098-de229db51175',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a'
    ],
    availableFrom: '2023-09-01'
  }
]

interface Property {
  id: string
  title: string
  price: number
  address: string
  neighborhood: string
  city: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  area: number
  description: string
  propertyType: string
  imageUrl: string
  images: string[]
  availableFrom: string
}

export default function PropertyDetailPage({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const { id } = params
  const [selectedImage, setSelectedImage] = useState(0)
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch from API
    const foundProperty = properties.find(p => p.id === id)

    // Simulate API loading
    const timer = setTimeout(() => {
      setProperty(foundProperty || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Imóvel não encontrado
        </h1>
        <p className="text-gray-600 mb-8">
          O imóvel que você está procurando não existe ou foi removido.
        </p>
        <Button
          onClick={() => router.push('/properties')}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Ver todos os imóveis
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {property.title}
        </h1>
        <p className="text-lg text-gray-600">
          {property.address}, {property.neighborhood} - {property.city}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src={property.images[selectedImage]}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex overflow-x-auto space-x-4 pb-2">
              {property.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-indigo-600'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Property details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Descrição
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Detalhes
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">
                    {property.bedrooms} quartos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">
                    {property.bathrooms} banheiros
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">{property.area} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">
                    Disponível a partir de{' '}
                    {new Date(property.availableFrom).toLocaleDateString(
                      'pt-BR'
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Localização
              </h2>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">
                    {property.address}, {property.neighborhood}
                  </p>
                  <p className="text-gray-700">
                    {property.city} - CEP: {property.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact and pricing sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="mb-4">
              <p className="text-3xl font-bold text-indigo-600">
                R$ {property.price.toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-500">por mês</p>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Agendar visita
              </Button>

              <Button
                variant="outline"
                className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Entrar em contato
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informações do anunciante
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-bold">AA</span>
              </div>
              <div>
                <p className="font-medium">Aluga Aqui Imóveis</p>
                <p className="text-sm text-gray-500">Membro desde 2022</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Responde em até 24 horas
            </p>
            <Button variant="link" className="text-indigo-600 p-0 h-auto">
              Ver mais anúncios desse anunciante
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
