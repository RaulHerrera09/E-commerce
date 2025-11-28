import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCartPost } from '../store/slices/cart.slice';

const ProductDetail = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Petición al backend para obtener un solo producto
        fetch(`https://api-easyelectroshop.onrender.com/api/productos/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Producto no encontrado");
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const addToCart = () => {
        if (product) {
            dispatch(thunkCartPost(product));
            alert(`${product.nombre} agregado al carrito 🛒`);
        }
    };

    if (loading) return <div className="text-center mt-20 text-gray-500 font-bold">Cargando...</div>;
    if (!product) return <div className="text-center mt-20 text-red-500 font-bold">Producto no encontrado</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Botón Volver */}
            <Link to="/" className="text-gray-500 hover:text-gray-800 mb-6 inline-flex items-center gap-2 transition">
                <i className="fa-solid fa-arrow-left"></i> Volver a la tienda
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow-lg border border-gray-100">

                {/* Columna Izquierda: Imagen */}
                <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
                    <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="max-h-96 w-full object-contain mix-blend-multiply"
                    />
                </div>

                {/* Columna Derecha: Información */}
                <div className="flex flex-col justify-center">
                    <span className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-2">{product.categoria}</span>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.nombre}</h1>

                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        {product.descripcion}
                    </p>

                    <div className="flex items-end justify-between mb-8 border-t border-gray-100 pt-6">
                        <div>
                            <span className="text-gray-400 text-sm font-medium block mb-1">Precio</span>
                            <span className="text-4xl font-bold text-gray-900">${product.precio}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-400 text-sm font-medium block mb-1">Disponibilidad</span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.stock > 0 ? `En Stock: ${product.stock}` : 'Agotado'}
                            </span>
                        </div>
                    </div>

                    {/* Botón Agregar al Carrito */}
                    <button
                        onClick={addToCart}
                        disabled={product.stock === 0}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${product.stock > 0
                            ? 'bg-gray-900 text-white hover:bg-black hover:shadow-xl'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {product.stock > 0 ? (
                            <>
                                <i className="fa-solid fa-cart-plus mr-2"></i> Agregar al Carrito
                            </>
                        ) : 'Sin Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;