Easy ElectroShop 🛒

Easy ElectroShop es una aplicación de comercio electrónico Full Stack desarrollada con React (Frontend) y Node.js/Express (Backend). Permite a los usuarios explorar un catálogo de electrodomésticos, filtrar productos, gestionar un carrito de compras y simular un proceso de pago completo con reglas de negocio específicas.

🚀 Características Principales

Catálogo Interactivo: Visualización de productos con imágenes reales, precios y descripciones.

Búsqueda y Filtros: Filtrado por nombre, categoría y rango de precios.

Carrito de Compras: Gestión de productos (agregar, eliminar, vaciar) persistente mediante Redux.

Autenticación de Usuarios: Registro e inicio de sesión con validación de usuarios duplicados.

Simulación de Compra (Checkout):

Cálculo automático de costos de envío (Local vs Foráneo).

Servicios adicionales (Instalación, Garantía).

Métodos de pago (Tarjeta, Monedero) y plazos (Meses sin intereses).

Historial de Pedidos: Panel de usuario con resumen de gastos y seguimiento de estatus de envío.

Persistencia de Datos: Uso de localStorage para mantener la sesión y el historial de compras activo.

🛠️ Tecnologías Utilizadas

Frontend: React, Redux Toolkit, React Router DOM, Tailwind CSS, React Hook Form.

Backend: Node.js, Express.js, CORS.

Despliegue: Render (Web Service para API, Static Site para Cliente).

📂 Estructura del Código y Funciones Clave

A continuación se describe brevemente la responsabilidad de los archivos más importantes del proyecto.

1. Backend (/server)

server.js: Es el corazón del servidor.

Base de Datos (Memoria): Contiene el array productos con la información del catálogo y el array usuariosRegistrados para almacenar temporalmente los usuarios.

Endpoints (Rutas):

GET /api/productos: Devuelve la lista completa de electrodomésticos.

GET /api/productos/:id: Busca y devuelve un producto específico por su ID.

POST /api/register: Recibe datos de un nuevo usuario, valida si el correo ya existe y lo guarda.

POST /api/login: Verifica las credenciales (correo/contraseña) y devuelve el usuario si es correcto.

2. Frontend (/client/src)

Configuración Global

main.jsx: Punto de entrada de React. Configura el Provider de Redux para que toda la app tenga acceso al estado global.

App.jsx: Define el enrutamiento (react-router-dom). Estructura la navegación entre páginas y protege las rutas privadas (como Checkout y Perfil) usando ProtectedRoutes.

Gestión de Estado (Redux)

store/slices/cart.slice.jsx: Maneja la lógica del carrito de compras.

addToCartLocal: Añade un producto al array del carrito.

removeFromCart: Elimina un producto específico por su ID.

setCart: Reemplaza el carrito completo (útil para vaciarlo al comprar).

thunkCartPost: Función asíncrona (Thunk) para manejar la acción de agregar productos.

Componentes (/components)

Navbar.jsx: Barra de navegación superior. Muestra el nombre del usuario logueado, enlaces principales y el contador de productos en el carrito.

Cart.jsx: Panel lateral deslizante (Offcanvas). Muestra el resumen de productos seleccionados y redirige al Checkout.

Filters.jsx: Contiene la barra de búsqueda, el selector de categorías y el slider de precio. Comunica los filtros seleccionados a Home.jsx.

ProtectedRoutes.jsx: Componente de seguridad. Verifica si existe un token en localStorage. Si no existe, redirige al usuario al Login.

Páginas (/pages)

Home.jsx: Página principal.

Obtiene los productos del backend (fetch).

Implementa la lógica de filtrado combinada (Nombre + Categoría + Precio).

Renderiza la cuadrícula de productos.

ProductDetail.jsx: Vista individual del producto. Muestra descripción detallada y valida el stock antes de permitir agregar al carrito.

Login.jsx & Register.jsx: Formularios de autenticación. Gestionan la comunicación con el backend para iniciar sesión o crear cuentas, manejando errores (como usuarios duplicados).

Checkout.jsx: Página final de compra.

Calcula el total final aplicando reglas de negocio (envío +5%, instalación +10%).

Recopila la dirección de entrega.

Simula el proceso de pago y guarda la orden en el historial local.

Purchases.jsx: Historial de pedidos.

Lee el localStorage para mostrar las compras pasadas.

Simula el cambio de estatus de "Procesando" a "Enviado" después de 10 segundos.

Muestra un dashboard con el total gastado.

📦 Instalación y Ejecución Local

Si deseas correr este proyecto en tu computadora:

Clonar el repositorio:

git clone <TU_URL_DEL_REPOSITORIO>


Configurar el Backend:

cd server
npm install
node server.js


(El servidor correrá en el puerto 3001)

Configurar el Frontend:
(En una nueva terminal)

cd client
npm install
npm run dev


(El cliente correrá en el puerto 5173)

🌐 Enlace al Proyecto

Puedes ver el proyecto en vivo aquí: https://cliente-easyelectroshop.onrender.com
Easy ElectroShop en Render

Desarrollado por [Raul Herrera Delgadillo] - 2025

