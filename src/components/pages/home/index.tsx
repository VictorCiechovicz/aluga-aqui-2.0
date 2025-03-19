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
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914'
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
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
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
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
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
