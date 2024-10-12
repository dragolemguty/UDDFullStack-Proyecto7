import { useContext, useEffect} from 'react';
import { RefreshContext } from '../context/RefreshContext';  // Importar el contexto

const Index = () => {
  const { setShouldRefresh } = useContext(RefreshContext);  // Obtener setShouldRefresh del contexto

  useEffect(() => {
    // Verifica si se accede desde un inicio de sesión o reserva
    const fromLoginOrBooking = sessionStorage.getItem('fromLoginOrBooking');

    if (fromLoginOrBooking) {
      sessionStorage.removeItem('fromLoginOrBooking'); // Limpia la señal
      setShouldRefresh(true);  // Actualiza el estado global para forzar el refresh
      window.location.reload();  // Refresca la página
    }
  }, [setShouldRefresh]);


  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Bienvenido a nuestro Hotel</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Disfruta de nuestras exclusivas habitaciones y servicios de lujo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Habitaciones con vista al mar</h2>
            <p className="text-gray-600">
              Despierta cada mañana con una impresionante vista al océano y disfruta de la brisa marina desde tu balcón privado.
            </p>
          </div>
          {/* Tarjeta 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Servicio todo incluido</h2>
            <p className="text-gray-600">
              Disfruta de comidas gourmet, bebidas premium y actividades recreativas, todo incluido en tu estadía.
            </p>
          </div>
          {/* Tarjeta 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Spa y gimnasio</h2>
            <p className="text-gray-600">
              Relájate en nuestro spa de clase mundial o mantente en forma en nuestro gimnasio totalmente equipado.
            </p>
          </div>
          {/* Tarjeta 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Restaurante gourmet</h2>
            <p className="text-gray-600">
              Saborea platos exquisitos preparados por chefs reconocidos internacionalmente en nuestro restaurante exclusivo.
            </p>
          </div>
        </div>
        {/* Contenido adicional */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Experiencias Inolvidables</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Descubre actividades únicas y momentos memorables durante tu estadía con nosotros.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Paseos en yate al atardecer</li>
            <li>Excursiones de buceo y snorkel</li>
            <li>Clases de cocina con nuestros chefs</li>
            <li>Eventos y entretenimiento en vivo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
