import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../store/slices/cart.slice';
import Cart from './Cart';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);

    // 1. Accedemos al estado del carrito para mostrar el contador
    const cartItems = useSelector(state => state.cart || []);

    // 2. Lógica para obtener el nombre del usuario de forma segura
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    let userName = null;

    if (userStr) {
        try {
            // Intentamos parsear si guardaste un objeto JSON en el Login
            const userObj = JSON.parse(userStr);
            userName = userObj.nombre || userObj.firstName || "Usuario";
        } catch (e) {

            userName = userStr;
        }
    }

    // Lógica para abrir el carrito
    const handleCartClick = () => {
        if (token) {
            setShowCart(true);
        } else {
            navigate('/login');
        }
    };

    // Lógica para ir a mis compras
    const handlePurchasesClick = () => {
        if (token) {
            navigate('/purchases');
        } else {
            navigate('/login');
        }
    };

    // Cerrar sesión
    const logout = () => {
        localStorage.clear();
        dispatch(setCart([]));
        navigate('/login');
    };

    return (
        <>
            {/* Barra de Navegación Fija */}
            <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 h-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">

                        {/* LOGO */}
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
                            <span>E-commerce</span>
                            <i className='bx bxs-shopping-bags text-blue-600'></i>
                        </Link>

                        {/* MENÚ DERECHO */}
                        <div className="flex items-center gap-6">

                            {/* Mensaje de Bienvenida (Solo si hay usuario) */}
                            {userName && (
                                <span className="hidden md:block text-sm text-gray-500 font-medium">
                                    Hola, {userName}
                                </span>
                            )}

                            {/* Icono: Mis Compras */}
                            <button
                                onClick={handlePurchasesClick}
                                className="text-gray-600 hover:text-blue-600 transition text-xl relative group"
                                title="Mis Pedidos"
                            >
                                <i className="fa-solid fa-box-archive"></i>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                    Pedidos
                                </span>
                            </button>

                            {/* Icono: Carrito con Contador */}
                            <button
                                onClick={handleCartClick}
                                className="text-gray-600 hover:text-blue-600 transition text-xl relative"
                            >
                                <i className='bx bxs-cart text-2xl'></i>
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>

                            {/* Icono: Login / Logout */}
                            {token ? (
                                <button
                                    onClick={logout}
                                    className="text-red-500 hover:text-red-700 transition text-xl"
                                    title="Cerrar Sesión"
                                >
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-blue-600 transition text-xl"
                                    title="Iniciar Sesión"
                                >
                                    <i className='bx bx-user'></i>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Espaciador para que el contenido no quede oculto tras el navbar fijo */}
            <div className="h-16"></div>

            {/* Componente del Carrito */}
            <Cart show={showCart} handleClose={() => setShowCart(false)} />
        </>
    );
}

export default Navbar;