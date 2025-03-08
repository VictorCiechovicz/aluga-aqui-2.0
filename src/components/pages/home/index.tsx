import { FeaturedProperties } from './components/FeaturedProperties'
import { Features } from './components/Features'
import { Hero } from './components/Hero'

export function HomeComponent() {
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
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <FeaturedProperties properties={featuredProperties} />

      <Features />
    </div>
  )
}
