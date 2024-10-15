import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Sobre Nosotros</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Quiénes Somos</h2>
          <p className="text-gray-700 leading-relaxed">
            Bienvenido a Hotelera Shoebilera, donde nuestra pasión es ofrecer un servicio excelente y experiencias inolvidables. 
            Establecida en 2023, hemos crecido hasta convertirnos en un líder en ofrecer alojamientos de clase mundial y un servicio excepcional 
            a nuestros valiosos huéspedes. Ya sea que estés aquí por negocios o por placer, estamos comprometidos a garantizar que tu estadía sea lo más cómoda y agradable posible.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed">
            Nuestra misión es simple: crear momentos memorables para nuestros huéspedes al ofrecer un servicio de primera clase, 
            alojamientos lujosos y una experiencia fluida desde la reserva hasta el checkout. Nos esforzamos por ir más allá en todo lo que hacemos para garantizar que cada estadía sea mejor que la anterior.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-500 mb-4">¿Por Qué Elegirnos?</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Servicio al cliente excepcional</li>
            <li>Alojamientos lujosos y cómodos</li>
            <li>Ubicaciones convenientes y destinos hermosos</li>
            <li>Proceso de reserva y pago sin complicaciones</li>
            <li>Ofertas exclusivas y descuentos para clientes leales</li>
          </ul>
        </section>

        <div className="text-center mt-8">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-700 transition duration-300">
            Contáctanos
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
