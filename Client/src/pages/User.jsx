import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCart } from '../store/slices/cart.slice';

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Recuperamos datos del localStorage
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { nombre: "Invitado", correo: "invitado@mail.com", telefono: "0000000000" };

    // Simulamos un saldo de Monedero
    const saldoMonedero = 5000.00;

    const logout = () => {
        localStorage.clear();
        dispatch(setCart([]));
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Cuenta</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Tarjeta de Perfil */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Información Personal</h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 uppercase">Nombre Completo</label>
                                <p className="font-semibold text-gray-800">{user.nombre || user.firstName + ' ' + user.lastName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 uppercase">Correo Electrónico</label>
                                <p className="font-semibold text-gray-800">{user.correo || user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 uppercase">Teléfono</label>
                                <p className="font-semibold text-gray-800">{user.telefono || user.phone || "No registrado"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarjeta de Monedero Electrónico */}
                <div className="bg-gradient-to-br from-gray-800 to-black text-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex justify-between items-start">
                            <h2 className="text-lg font-bold text-gray-200">Monedero</h2>
                            <i className="fa-solid fa-wallet text-2xl text-gray-400"></i>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Saldo disponible</p>
                        <p className="text-4xl font-bold mt-2">${saldoMonedero.toLocaleString()}</p>
                    </div>

                    <div className="mt-6">
                        <button className="w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition text-sm">
                            <i className="fa-solid fa-plus mr-2"></i> Recargar Saldo
                        </button>
                    </div>
                </div>
            </div>

            {/* Botón Cerrar Sesión */}
            <div className="mt-8">
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold border border-red-200 hover:border-red-400 px-6 py-3 rounded transition"
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default User;