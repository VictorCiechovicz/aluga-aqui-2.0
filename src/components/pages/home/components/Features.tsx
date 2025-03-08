export function Features() {
  return (
    <section className="bg-indigo-100 py-16">
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
            <h3 className="text-xl font-semibold mb-4">Imóveis Verificados</h3>
            <p className="text-gray-600">
              Todos os imóveis são verificados para garantir sua segurança e
              tranquilidade.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Suporte Dedicado</h3>
            <p className="text-gray-600">
              Nossa equipe está sempre pronta para ajudar em todas as etapas do
              processo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
