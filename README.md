# 🛒 Easy ElectroShop - Full Stack E-Commerce

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Easy ElectroShop** es una aplicación de comercio electrónico robusta desarrollada con el stack **PERN/MERN** (adaptada con base de datos en memoria para propósitos de demostración). Permite gestionar un flujo de compra completo, desde la autenticación hasta el seguimiento de pedidos en tiempo real.

> **🚀 DEMO EN VIVO:** [Visitar Easy ElectroShop en Render](https://cliente-easyelectroshop.onrender.com)

---

## ✨ Características Principales

* **🛍️ Catálogo Interactivo:** Visualización de productos con imágenes reales, precios y gestión de stock.
* **🔍 Búsqueda y Filtros:** Sistema avanzado para filtrar por nombre, categoría y rango de precios de forma dinámica.
* **🛒 Carrito de Compras:** Gestión persistente mediante **Redux Toolkit** (añadir, eliminar y vaciar).
* **🔐 Autenticación de Usuarios:** Registro e inicio de sesión con validación de credenciales y control de usuarios duplicados.
* **💳 Simulación de Compra (Checkout):**
    * Cálculo automático de costos de envío (Local vs Foráneo).
    * Servicios adicionales (Instalación, Garantía).
    * Métodos de pago flexibles y selección de plazos (MSI).
* **📊 Historial de Pedidos:** Panel de usuario con resumen de gastos y cambio de estatus automático (Procesando -> Enviado).

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
* **React** & **Vite**: Biblioteca principal y herramienta de construcción.
* **Redux Toolkit**: Manejo del estado global de la aplicación.
* **React Router DOM**: Gestión de navegación y rutas protegidas.
* **Tailwind CSS**: Estilizado responsivo y moderno.
* **React Hook Form**: Gestión eficiente de formularios de contacto y pago.

### **Backend**
* **Node.js** & **Express.js**: Entorno de ejecución y framework para la API REST.
* **CORS**: Seguridad para el intercambio de recursos entre orígenes.
* **LocalStorage**: Persistencia de sesión y datos del historial en el cliente.

---

## 📂 Estructura del Proyecto



### **Backend (`/server`)**
* `server.js`: Servidor principal que gestiona los productos y usuarios en memoria.
* **Endpoints Clave:**
    * `GET /api/productos`: Lista completa de electrodomésticos.
    * `POST /api/register` & `POST /api/login`: Gestión de acceso.

### **Frontend (`/client/src`)**
* **`store/slices/cart.slice.jsx`**: Lógica centralizada para el manejo del carrito.
* **`components/`**: Componentes reutilizables como la `Navbar`, `Cart` (Offcanvas) y `ProtectedRoutes`.
* **`pages/`**:
    * `Home.jsx`: Lógica de filtrado combinada.
    * `Checkout.jsx`: Lógica de negocio (costos extras de envío e instalación).
    * `Purchases.jsx`: Dashboard de seguimiento y gastos totales.

---

## 🚀 Instalación y Ejecución Local

Si deseas correr este proyecto en tu propia máquina:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/RaulHerrera09/TU_REPOSITORIO.git](https://github.com/RaulHerrera09/TU_REPOSITORIO.git)
cd Easy-ElectroShop
```

### 2. Configurar el Backend:
```bash
cd server
npm install
node server.js
# El servidor correrá en http://localhost:3001
```

### 3. Configurar el Frontend:
En una nueva terminal:
```bash
cd client
npm install
npm run dev
# El cliente correrá en http://localhost:5173
```

## 🧠 Sobre el Desarrollador
Soy estudiante de Ingeniería en Sistemas Computacionales en la Universidad Lamar (Graduación prevista para 2026), especializado en la intersección entre el Análisis de Datos y la Ingeniería de Software. Desarrollo herramientas que transforman datos crudos y complejos en inteligencia de negocios accionable.

Portafolio: raulherrera09.github.io/RaulHerrera.github.io/

LinkedIn: @raulherreradelgadillo

