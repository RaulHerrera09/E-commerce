import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart, removeFromCart } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Obtenemos el carrito directamente de Redux
    const cart = useSelector(state => state.cart || []);

    // Cálculo del total 
    const totalShopping = cart.reduce((total, item) => total + Number(item.precio), 0);

    const deleteElement = (id) => {
        // Borramos localmente usando la acción de Redux que creamos
        dispatch(removeFromCart(id));
    }

    const clearCart = () => {
        dispatch(setCart([]));
    }

    const checkout = () => {
        // Simulación de compra
        if (cart.length === 0) return;

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            handleClose();
            return;
        }


        // Como es demo, simulamos éxito:
        alert("¡Compra realizada con éxito! 📦");
        dispatch(setCart([]));
        navigate('/purchases');
        handleClose();
    };

    return (
        /* Overlay  - Controlamos visibilidad con la prop 'show' */
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${show ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>

            {/* Fondo negro transparente */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={handleClose}
            ></div>

            {/* Panel Lateral */}
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${show ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header del Carrito */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        Tu Carrito ({cart.length})
                    </h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-red-500 text-2xl">
                        &times; {/* X para cerrar */}
                    </button>
                </div>

                {/* Cuerpo: Lista de Productos */}
                <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            <i className='bx bxs-cart-add text-6xl mb-4'></i>
                            <p>No hay productos seleccionados.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded shadow-sm">
                                    {/* Imagen pequeña */}
                                    <img
                                        src={item.imagen}
                                        alt={item.nombre}
                                        className="w-16 h-16 object-cover rounded bg-white"
                                    />

                                    {/* Info Producto */}
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-800">{item.nombre}</h3>
                                        <p className="text-blue-600 font-semibold">${item.precio}</p>
                                    </div>

                                    {/* Botón Eliminar */}
                                    <button
                                        onClick={() => deleteElement(item.id)}
                                        className="text-red-400 hover:text-red-600 transition p-2"
                                        title="Eliminar"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer: Totales y Botones */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4 text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600">${totalShopping}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Botón Vaciar */}
                        <button
                            onClick={clearCart}
                            disabled={cart.length === 0}
                            className={`py-2 px-4 rounded font-bold transition ${cart.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                        >
                            Vaciar
                        </button>

                        {/* Botón Pagar */}
                        <button
                            onClick={checkout}
                            disabled={cart.length === 0}
                            className={`py-2 px-4 rounded font-bold transition ${cart.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white hover:bg-black'}`}
                        >
                            Comprar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Cart;