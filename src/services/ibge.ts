interface IBGECity {
  id: number
  nome: string
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string
      }
    }
  }
}

export interface City {
  name: string
  state: string
}

export async function fetchCities(searchTerm: string): Promise<City[]> {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`
    )
    const data: IBGECity[] = await response.json()

    const cities = data.map(city => ({
      name: city.nome,
      state: city.microrregiao.mesorregiao.UF.sigla
    }))

    if (!searchTerm) return []

    return cities
      .filter(
        city =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.state.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5)
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}
