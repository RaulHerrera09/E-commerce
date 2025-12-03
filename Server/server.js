
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const usuariosRegistrados = [];


const productos = [
    {
        id: 1,
        nombre: "Refrigerador Smart Inverter",
        descripcion: "Refrigerador de dos puertas con dispensador de agua y ahorro de energía.",
        precio: 15999,
        stock: 5,
        categoria: "Refrigeración",
        imagen: "https://www.lg.com/cac/images/FM-M-006.jpg",
        color: "Gris Platino"
    },
    {
        id: 2,
        nombre: "Lavadora Carga Frontal",
        descripcion: "Lavadora automática 20kg con ciclo de vapor.",
        precio: 12500,
        stock: 3,
        categoria: "Lavado",
        imagen: "https://www.viu.mx/img/1024/1024/resize/L/G/LG_01440_x1_1.jpg",
        color: "Blanco"
    },
    {
        id: 3,
        nombre: "Microondas Chef",
        descripcion: "Horno de microondas con grill y descongelado rápido.",
        precio: 3200,
        stock: 10,
        categoria: "Cocina",
        imagen: "https://resources.sears.com.mx/medios-plazavip/fotos/productos_sears1/original/4516505.jpg",
        color: "Gris Platino"
    },
    {
        id: 4,
        nombre: "Licuadora Profesional",
        descripcion: "Motor de alta potencia para triturar hielo y frutas enteras.",
        precio: 1800,
        stock: 15,
        categoria: "Pequeños Electrodomésticos",
        imagen: "https://res.cloudinary.com/sharkninja-na/image/upload/c_fit,h_600,w_600/v1/SharkNinja-MX/BN701LAA_ES_MX_01?_a=BAKAACDX0",
        color: "Negro"
    },
    {
        id: 5,
        nombre: "Cafetera Expresso",
        descripcion: "Prepara café tipo barista en casa. Espumador de leche incluido.",
        precio: 4500,
        stock: 8,
        categoria: "Cocina",
        imagen: "https://www.koblenz.com.mx/cdn/shop/files/CKM-7503.png?v=1752110257&width=1200",
        color: "Plata"
    },
    {
        id: 6,
        nombre: "Freidora de Aire (Air Fryer)",
        descripcion: "Cocina saludable sin aceite. Capacidad de 4 litros digital.",
        precio: 2100,
        stock: 20,
        categoria: "Cocina",
        imagen: "https://www.philips.com.mx/c-dam/b2c/category-pages/Household/cooking/kitchen-testwochen-gesundheit/produkte/HD9240-90-2.png",
        color: "Negro"
    },
    {
        id: 7,
        nombre: "Batidora de Pedestal",
        descripcion: "Ideal para repostería. Incluye tazón de acero inoxidable.",
        precio: 5200,
        stock: 4,
        categoria: "Pequeños Electrodomésticos",
        imagen: "https://m.media-amazon.com/images/I/61WiHltq4YL._AC_UF894,1000_QL80_.jpg",
        color: "Rojo"
    },
    {
        id: 8,
        nombre: "Plancha de Vapor",
        descripcion: "Suela de cerámica antiadherente y golpe de vapor vertical.",
        precio: 850,
        stock: 25,
        categoria: "Hogar",
        imagen: "https://m.media-amazon.com/images/I/71v1zFxlTwL.jpg",
        color: "Azul"
    },
    {
        id: 9,
        nombre: "Aspiradora Robot",
        descripcion: "Limpieza automática inteligente con sensores anti-caída.",
        precio: 6500,
        stock: 6,
        categoria: "Limpieza",
        imagen: "https://cdn.homedepot.com.mx/productos/164770/164770-d.jpg",
        color: "Blanco"
    }
];

//RUTAS 

// 1. Obtener todos los productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// 2. Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ mensaje: "Producto no encontrado" });
    }
});

// 3. REGISTRO 
app.post('/api/register', (req, res) => {
    const usuarioNuevo = req.body;

    const usuarioExistente = usuariosRegistrados.find(u => u.email === usuarioNuevo.email);

    if (usuarioExistente) {

        return res.status(400).json({ error: "Este correo ya está registrado. Intenta iniciar sesión." });
    }

    usuariosRegistrados.push(usuarioNuevo);
    console.log("Nuevo usuario registrado:", usuarioNuevo.fullName);
    res.json({ mensaje: "Registro exitoso" });
});

// 4. LOGIN INTELIGENTE 
app.post('/api/login', (req, res) => {
    const { correo, password } = req.body;


    const usuarioEncontrado = usuariosRegistrados.find(u => u.email === correo && u.password === password);

    if (usuarioEncontrado) {

        res.json({
            mensaje: "Login exitoso",
            usuario: {
                nombre: usuarioEncontrado.fullName,
                correo: usuarioEncontrado.email,
                monedero: 5000,
                telefono: usuarioEncontrado.phone
            }
        });
    } else {

        if (correo) {
            res.json({
                mensaje: "Login demo",
                usuario: {
                    nombre: "Usuario Demo",
                    correo: correo,
                    monedero: 5000,
                    telefono: "555-000-0000"
                }
            });
        } else {
            res.status(400).json({ error: "Faltan datos" });
        }
    }
});


app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});