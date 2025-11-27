import React from 'react';
import { Link } from 'react-router-dom';

const Purchases = () => {
    // Datos simulados para demostración
    const historialSimulado = [
        {
            id: "PED-8852",
            fecha: "26/11/2025",
            total: 15999,
            estado: "Enviado", // 
            metodoPago: "Monedero Electrónico", // 
            items: [
                { nombre: "Refrigerador Smart Inverter", precio: 15999, cantidad: 1 }
            ]
        },
        {
            id: "PED-1024",
            fecha: "20/11/2025",
            total: 3200,
            estado: "Entregado",
            metodoPago: "Tarjeta de Crédito",
            items: [
                { nombre: "Microondas Chef", precio: 3200, cantidad: 1 }
            ]
        }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <i className="fa-solid fa-box-open text-blue-600"></i> Mis Pedidos
            </h1>

            <div className="space-y-6">
                {historialSimulado.map((pedido) => (
                    <div key={pedido.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">

                        {/* Cabecera Gris */}
                        <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4 text-sm">
                            <div className="flex gap-8">
                                <div>
                                    <span className="block text-gray-500 uppercase text-xs font-bold">Fecha</span>
                                    <span className="text-gray-800">{pedido.fecha}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 uppercase text-xs font-bold">Total</span>
                                    <span className="text-gray-800 font-semibold">${pedido.total}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 uppercase text-xs font-bold">Pago</span>
                                    <span className="text-gray-800">{pedido.metodoPago}</span>
                                </div>
                            </div>
                            <div className="font-mono text-gray-500 text-xs">
                                ID: {pedido.id}
                            </div>
                        </div>

                        {/* Cuerpo del Pedido */}
                        <div className="p-6 flex flex-col md:flex-row gap-6 items-center">

                            {/* Lista de productos */}
                            <div className="flex-1 w-full space-y-4">
                                {pedido.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                <i className="fa-regular fa-image text-2xl"></i>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{item.nombre}</h3>
                                                <p className="text-gray-500 text-sm">Cantidad: {item.cantidad}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-blue-600">${item.precio}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Estado del Envío */}
                            <div className="w-full md:w-auto md:border-l md:pl-6 flex flex-col items-end min-w-[150px]">
                                <span className="text-xs text-gray-400 uppercase font-bold mb-2">Estado del Envío</span>
                                <span className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${pedido.estado === 'Entregado'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    <i className={`fa-solid ${pedido.estado === 'Entregado' ? 'fa-check' : 'fa-truck'}`}></i>
                                    {pedido.estado}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link to="/" className="inline-block px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition">
                    Seguir Comprando
                </Link>
            </div>
        </div>
    );
};

export default Purchases;