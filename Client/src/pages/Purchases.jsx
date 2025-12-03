import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Purchases = () => {

    // Datos de ejemplo 
    const datosEjemplo = [
        {
            id: "DEMO-001",
            fecha: "26/11/2025",
            total: 15999,
            estado: "Entregado",
            metodoPago: "Monedero Electrónico",
            items: [{ nombre: "Refrigerador Smart Inverter", precio: 15999, cantidad: 1 }]
        }
    ];

    const [pedidos, setPedidos] = useState([]);

    // 1. CARGAR DATOS AL INICIO
    useEffect(() => {
        const historialGuardado = localStorage.getItem('historial_compras');
        if (historialGuardado) {
            setPedidos(JSON.parse(historialGuardado));
        } else {
            setPedidos(datosEjemplo);
        }
    }, []);

    // 2. SIMULACIÓN DE ENVÍO
    useEffect(() => {
        // Buscamos si hay algún pedido reciente que siga "Procesando"
        const hayPedidosPendientes = pedidos.some(p => p.estado === "Procesando");

        if (hayPedidosPendientes) {
            const timer = setTimeout(() => {

                const pedidosActualizados = pedidos.map(pedido => {
                    if (pedido.estado === "Procesando") {
                        return { ...pedido, estado: "Enviado" };
                    }
                    return pedido;
                });

                // Actualizamos el estado y la memoria del navegador
                setPedidos(pedidosActualizados);
                localStorage.setItem('historial_compras', JSON.stringify(pedidosActualizados));




            }, 10000);


            return () => clearTimeout(timer);
        }
    }, [pedidos]);

    // CÁLCULOS AUTOMÁTICOS
    const estadisticas = useMemo(() => {
        const totalGastado = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);
        const totalPedidos = pedidos.length;
        const ultimaCompra = pedidos.length > 0 ? pedidos[0].fecha : "-";
        return { totalGastado, totalPedidos, ultimaCompra };
    }, [pedidos]);

    // Función para asignar color y e ícono según el estado
    const getStatusStyle = (estado) => {
        switch (estado) {
            case 'Procesando':
                return {
                    style: 'bg-blue-100 text-blue-700 animate-pulse',
                    icon: 'fa-solid fa-hourglass-half'
                };
            case 'Enviado':
                return {
                    style: 'bg-green-100 text-green-700',
                    icon: 'fa-solid fa-truck-fast'
                };
            case 'Entregado':
                return {
                    style: 'bg-gray-100 text-gray-700',
                    icon: 'fa-solid fa-check-circle'
                };
            default:
                return {
                    style: 'bg-gray-100 text-gray-600',
                    icon: 'fa-solid fa-question'
                };
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <i className="fa-solid fa-clock-rotate-left text-blue-600"></i> Historial de Compras
                </h1>

                <Link to="/" className="text-blue-600 font-semibold hover:underline">
                    <i className="fa-solid fa-shop mr-2"></i> Ir a la tienda
                </Link>
            </div>

            {/* --- DASHBOARD --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-100 text-sm font-bold uppercase mb-1">Total Gastado</p>
                            <h2 className="text-4xl font-bold">${estadisticas.totalGastado.toLocaleString()}</h2>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg"><i className="fa-solid fa-sack-dollar text-2xl"></i></div>
                    </div>
                    <p className="text-xs text-blue-200 mt-4">Acumulado histórico</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-orange-100 text-orange-600 rounded-full"><i className="fa-solid fa-box-open text-xl"></i></div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase">Pedidos Realizados</p>
                            <h2 className="text-3xl font-bold text-gray-800">{estadisticas.totalPedidos}</h2>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-100 text-green-600 rounded-full"><i className="fa-regular fa-calendar-check text-xl"></i></div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase">Última Compra</p>
                            <h2 className="text-lg font-bold text-gray-800">{estadisticas.ultimaCompra}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-700 mb-4">Detalle de Movimientos</h2>

            <div className="space-y-6">
                {pedidos.map((pedido, index) => {
                    const statusConfig = getStatusStyle(pedido.estado);

                    return (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                            <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4 text-sm">
                                <div className="flex gap-8">
                                    <div><span className="block text-gray-500 uppercase text-xs font-bold">Fecha</span><span className="text-gray-800">{pedido.fecha}</span></div>
                                    <div><span className="block text-gray-500 uppercase text-xs font-bold">Total</span><span className="text-gray-800 font-semibold">${pedido.total.toLocaleString()}</span></div>
                                    <div><span className="block text-gray-500 uppercase text-xs font-bold">Pago</span><span className="text-gray-800">{pedido.metodoPago}</span></div>
                                </div>
                                <div className="font-mono text-gray-400 text-xs">ID: {pedido.id}</div>
                            </div>

                            <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                                <div className="flex-1 w-full space-y-4">
                                    {pedido.items && pedido.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400"><i className="fa-solid fa-bag-shopping"></i></div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-sm">{item.nombre}</h3>
                                                    <p className="text-gray-500 text-xs">Precio unitario</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-gray-600 text-sm">${item.precio.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* ESTADO DEL ENVÍO CON CAMBIO DINÁMICO */}
                                <div className="w-full md:w-auto md:border-l md:pl-6 flex flex-col items-end min-w-[150px]">
                                    <span className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-500 ${statusConfig.style}`}>
                                        <i className={statusConfig.icon}></i>
                                        {pedido.estado}
                                    </span>
                                    {pedido.estado === "Procesando" && (
                                        <p className="text-xs text-gray-400 mt-2 text-right">Actualizando en 10s...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={() => { localStorage.removeItem('historial_compras'); window.location.reload(); }}
                    className="text-red-400 text-xs hover:text-red-600 underline"
                >
                    [Borrar Historial de Pruebas]
                </button>
            </div>
        </div>
    );
};

export default Purchases;