import { PropertyCard } from '@/components/pages/home/components/PropertyCard'

const properties = [
  {
    id: '1',
    title: 'Casa Moderna com Jardim',
    price: 2500,
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    imageUrl: '/house1.jpg'
  },
  {
    id: '2',
    title: 'Apartamento no Centro',
    price: 1800,
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    imageUrl: '/apartment1.jpg'
  }
  // Add more properties as needed
]

export default function PropertiesPage({
  searchParams
}: {
  searchParams: { city?: string }
}) {
  const { city } = searchParams
  const filteredProperties = city
    ? properties.filter(property =>
        property.city.toLowerCase().includes(city.toLowerCase())
      )
    : properties

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {city
            ? `Imóveis para alugar em ${city}`
            : 'Todos os imóveis disponíveis'}
        </h1>
        <p className="text-gray-600">
          {filteredProperties.length}
          {filteredProperties.length === 1
            ? ' imóvel encontrado'
            : ' imóveis encontrados'}
        </p>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Nenhum imóvel encontrado
          </h2>
          <p className="text-gray-600">
            Tente buscar em outra cidade ou remova os filtros de busca.
          </p>
        </div>
      )}
    </main>
  )
}
