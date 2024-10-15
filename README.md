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

Home: 
![image](https://github.com/user-attachments/assets/dd64c45c-e9fe-448f-a341-32606efba20d)
About:
![image](https://github.com/user-attachments/assets/e8d2027f-1ff4-4666-9f43-4bee06380f88)
Reserva Aqui:
![image](https://github.com/user-attachments/assets/7f53138c-3e82-412e-93db-ce72e5ba6313)
SignUp:
![image](https://github.com/user-attachments/assets/d014acb8-f919-4fb2-9505-e748df64db38)
Login:
![image](https://github.com/user-attachments/assets/16b16d1a-d340-40f6-a0af-9d3eb631aa87)
Navbar Logeado:
![image](https://github.com/user-attachments/assets/de55ebf6-e519-4c9f-a2a1-6ebb1dc82b29)
Carrito de compra persistente:
![image](https://github.com/user-attachments/assets/0f9941bc-9525-4d1e-ad28-ae5733cc7768)
Al reservar una habitacion de Reserva Aqui:
![image](https://github.com/user-attachments/assets/5c524e93-68b7-4dae-a1e7-2c9948880ec4)
Calculo de costo segun duracion de estadia:
![image](https://github.com/user-attachments/assets/18c8453d-5718-45fe-a3ca-99b82432b01c)
Elemento agregado al carrito:
![image](https://github.com/user-attachments/assets/a554d3b6-dc8f-40e8-a735-c01c95600f54)
Pasarela de pago PayPal:
![image](https://github.com/user-attachments/assets/46b21c24-ab1f-4e96-91d7-803cdd194b8d)
Reenvio a Mis Reserva:
![image](https://github.com/user-attachments/assets/b9b77c34-9f27-45b4-ab58-c656edbd1a9c)
Carrito post compra:
![image](https://github.com/user-attachments/assets/2603d245-70e7-44a2-8358-06fd00a51396)
Mi Perfil:
![image](https://github.com/user-attachments/assets/ed02bf79-0412-4ddd-bcf4-f688381fcf34)
Mis Reservas de otro Usuario:
![image](https://github.com/user-attachments/assets/52b7e87e-363d-47ce-a14f-732bfea1b8f4)
Usuario sin Reservas:
![image](https://github.com/user-attachments/assets/f3a08f36-0dc6-49ab-9fd1-73fac4fcb23a)


















