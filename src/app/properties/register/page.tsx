'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/auth-context'

interface City {
  id: number
  name: string
}

interface ImagePreview {
  file: File
  preview: string
}

const fetchCities = async (): Promise<City[]> => {
  // Simulating an API call to fetch cities
  return [
    { id: 1, name: 'São Paulo' },
    { id: 2, name: 'Rio de Janeiro' },
    { id: 3, name: 'Belo Horizonte' },
    { id: 4, name: 'Salvador' },
    { id: 5, name: 'Brasília' },
    { id: 6, name: 'Curitiba' },
    { id: 7, name: 'Fortaleza' },
    { id: 8, name: 'Manaus' },
    { id: 9, name: 'Recife' }
  ]
}

export default function RegisterProperty() {
  const router = useRouter()
  const { hasRestrictedAccess } = useAuth()
  const [cities, setCities] = useState<City[]>([])
  const [images, setImages] = useState<ImagePreview[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    street: '',
    number: '',
    neighborhood: '',
    cityId: '',
    complement: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    propertyType: 'house'
  })

  useEffect(() => {
    const loadCities = async () => {
      const citiesList = await fetchCities()
      setCities(citiesList)
    }
    loadCities()
  }, [])

  // Cleanup previews when component unmounts
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview))
    }
  }, [images])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    const newImages = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setImages(prev => [...prev, ...newImages])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      const newImages = [...prev]
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here we would typically handle the form submission
    // For now, we'll just console.log the data
    console.log('Form data:', formData)
    console.log(
      'Images:',
      images.map(img => img.file)
    )
    alert('Imóvel cadastrado com sucesso!')
    router.push('/properties')
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCancel = () => {
    if (hasRestrictedAccess) {
      // If user has restricted access, only allow navigation to home or properties listing
      router.push('/properties')
    } else {
      router.back()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Novo Imóvel</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço (R$)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Endereço</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rua
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="neighborhood"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bairro
              </label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cityId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cidade
              </label>
              <select
                id="cityId"
                name="cityId"
                value={formData.cityId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="complement"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Complemento
              </label>
              <input
                type="text"
                id="complement"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CEP
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quartos
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="bathrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Banheiros
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Área (m²)
            </label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="propertyType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de Imóvel
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="house">Casa</option>
            <option value="apartment">Apartamento</option>
            <option value="commercial">Comercial</option>
            <option value="land">Terreno</option>
          </select>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Fotos do Imóvel</h2>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="images"
              className="cursor-pointer text-gray-600 hover:text-gray-800"
            >
              <div className="space-y-2">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    Selecione as fotos
                  </span>
                  <p className="pl-1">ou arraste e solte aqui</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
              </div>
            </label>
          </div>

          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">
                  Imagens selecionadas ({images.length})
                </h3>
                {images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setImages([])}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remover todas
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group border border-gray-200 rounded-lg p-2 hover:border-blue-500 transition-colors"
                  >
                    <div className="relative w-full h-[240px] overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={image.preview}
                        alt={`Imagem ${index + 1}`}
                        className="object-contain"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30 rounded-lg">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform transition-transform hover:scale-110"
                        title="Remover imagem"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-sm">
                      Imagem {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Cadastrar Imóvel
          </button>
        </div>
      </form>
    </div>
  )
}
