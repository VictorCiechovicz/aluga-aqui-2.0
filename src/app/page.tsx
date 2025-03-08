import { Hero } from '@/components/Hero'
import { PropertyCard } from '@/components/PropertyCard'

// Temporary mock data for featured properties
const featuredProperties = [
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
  },
  {
    id: '3',
    title: 'Casa com Piscina',
    price: 3500,
    address: 'Rua dos Lagos, 456',
    city: 'Rio de Janeiro',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    imageUrl: '/house2.jpg'
  }
]

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Imóveis em Destaque
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Por que escolher o Aluga Aqui?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Busca Simplificada</h3>
              <p className="text-gray-600">
                Encontre seu próximo lar de forma rápida e fácil com nossa busca
                intuitiva.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Imóveis Verificados
              </h3>
              <p className="text-gray-600">
                Todos os imóveis são verificados para garantir sua segurança e
                tranquilidade.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Suporte Dedicado</h3>
              <p className="text-gray-600">
                Nossa equipe está sempre pronta para ajudar em todas as etapas
                do processo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
