import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCartPost } from "../store/slices/cart.slice";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [categoriasUnicas, setCategoriasUnicas] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("https://api-easyelectroshop.onrender.com/api/productos")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data);
                setProductosFiltrados(data);

                // Extraer categorías únicas dinámicamente
                const categorias = [...new Set(data.map(p => p.categoria))];
                setCategoriasUnicas(categorias);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    // lógica de filtrado avanzado
    const manejarFiltros = (filtros) => {
        const { nombre, categoria, precio } = filtros;

        const filtrados = productos.filter(producto => {
            // 1. Filtro por Nombre 
            const coincideNombre = producto.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
                producto.descripcion.toLowerCase().includes(nombre.toLowerCase());

            // 2. Filtro por Categoría 
            const coincideCategoria = categoria === "" || producto.categoria === categoria;

            // 3. Filtro por Precio 
            const coincidePrecio = producto.precio <= precio;


            return coincideNombre && coincideCategoria && coincidePrecio;
        });

        setProductosFiltrados(filtrados);
    };

    const agregarAlCarrito = (producto) => {
        dispatch(thunkCartPost(producto));
        // Pequeño feedback visual simple
        const btn = document.getElementById(`btn-add-${producto.id}`);
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Listo';
            btn.classList.add('bg-green-600', 'text-white');
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-green-600', 'text-white');
            }, 1500);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            {/* Encabezado */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Electrodomésticos</h1>
                <p className="text-gray-500">Calidad y tecnología para tu hogar</p>
            </div>

            {/* Componente de Filtros (las categorías y la función) */}
            <Filters onFilter={manejarFiltros} categorias={categoriasUnicas} />

            {/* Grid de Productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productosFiltrados.map((producto) => (
                    <div key={producto.id} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition flex flex-col">

                        <Link to={`/product/${producto.id}`} className="block overflow-hidden p-4 group bg-white rounded-t-lg">
                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                className="w-full h-48 object-contain group-hover:scale-105 transition-transform"
                            />
                        </Link>

                        <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
                            <span className="text-xs text-gray-400 uppercase font-bold mb-1">{producto.categoria}</span>

                            <Link to={`/product/${producto.id}`}>
                                <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition">{producto.nombre}</h2>
                            </Link>

                            <p className="text-gray-500 text-sm mt-2 mb-4 line-clamp-2">
                                {producto.descripcion}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-4">
                                <span className="text-xl font-bold text-blue-600">${producto.precio.toLocaleString()}</span>

                                <button
                                    id={`btn-add-${producto.id}`}
                                    onClick={() => agregarAlCarrito(producto)}
                                    className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-black transition flex items-center gap-2 text-sm font-medium"
                                >
                                    <i className="fa-solid fa-cart-plus"></i> Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mensaje de "No hay resultados" */}
            {productosFiltrados.length === 0 && (
                <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <i className="fa-regular fa-face-frown-open text-4xl mb-3"></i>
                    <p className="text-lg font-medium">No hay productos que coincidan con tus filtros.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;