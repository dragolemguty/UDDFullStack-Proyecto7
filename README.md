# Proyecto 7

Este es un proyecto **FullStack** que simula una página hotelera de reserva de habitaciones, que incluye tanto el **Frontend** como el **Backend**. La aplicación cuenta con diversas funcionalidades, tales como:

## Funcionalidades

- **Navbar de navegación**: Navega fácilmente entre las secciones de la página.
- **Registro (Sign Up)**: Conexión a la Base de Datos para registrar nuevos usuarios.
- **Inicio de sesión (Login)**: Acceso a la plataforma para usuarios registrados.
- **Estado del Navbar**: Cambios visuales en el Navbar al estar logueado.
- **Vista de Mi Perfil**: Acceso a la información personal del usuario.
- **Disponibilidad de habitaciones**: Lectura de la Base de datos para ofrecer las habitaciones disponibles.
- **Flujo de reservas**: Generación de reservas y agregarlas al carrito de compras.
- **Carrito de compras persistente**: Mantiene el carrito del usuario incluso después de hacer logout y volver a ingresar.
- **Pasarela de pago con PayPal**: Almacenamiento de datos de orden de compra en la Base de datos.
- **Visualización de reservas**: Sección "Mis Reservas" que muestra reservas actuales, pasadas y futuras.
- **Contador de reservas**: El carrito de compras incluye un span que muestra la cantidad de reservas a pagar.

## Requisitos para el funcionamiento

Para hacer funcionar el proyecto se requiere:

1. Inicializar el **Backend**:
   - Instalar las librerías necesarias.
   - Generar los archivos `.env` en el Backend y el Frontend con las credenciales necesarias (PayPal y MongoDB). Puedes seguir el archivo `.env.example` como guía.

2. Correr el servidor del **Backend**.

3. Iniciar el **Frontend**.

4. Inicializar la Base de datos del Backend para las habitaciones, por ejemplo, accediendo a la siguiente ruta (asumiendo que se configuró el puerto en el `.env` como `3000`): http://localhost:3000/api/rooms/init
   También puedes inicializar otras tablas de la Base de datos según corresponda la ruta. Para más detalles, consulta la documentación Swagger: http://localhost:3000/api/api-docs


## Trabajo Futuro

- Implementar **refresh automático** al agregar reservas (para que se actualice el contador en el Navbar del carrito de compras).
- Agregar **advertencias** y redireccionamiento automático al login cuando expira el token de inicio de sesión.
- Disponibilizar **endpoints** para la modificación de información de usuario en "Mi Perfil".
- Crear **endpoints** para la modificación de reservas pagadas (cancelación).
- Aplicar **descuentos** al comprar más reservas en un mismo pago.
- Mejorar la **estética general** de la aplicación, incluyendo una paleta de colores consistente en todas las vistas.
- Incluir **enlaces y visualización de imágenes** de productos (habitaciones).
- Añadir imágenes en vistas informativas.
- Implementar un **carrusel de fotos** en la página de inicio.
- Generar la lógica para un **superusuario/administrador** que pueda visualizar todos los datos de órdenes de pago, habitaciones, usuarios, reservas, etc.
- Documentar todos los **endpoints** en Swagger.

## Imágenes del Frontend

A continuación se presentarán algunas imágenes del frontend:


¡Gracias por tu interés en el proyecto!



