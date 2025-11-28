import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../store/slices/cart.slice';

const Checkout = () => {
    const cart = useSelector(state => state.cart || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Estados de reglas de negocio
    const [tipoEnvio, setTipoEnvio] = useState('gdl');
    const [requiereInstalacion, setRequiereInstalacion] = useState(false);
    const [garantiaExtendida, setGarantiaExtendida] = useState(false);
    const [metodoPago, setMetodoPago] = useState('tarjeta');
    const [plazoPago, setPlazoPago] = useState('contado');

    // Cálculos
    const subtotal = cart.reduce((acc, item) => acc + Number(item.precio), 0);
    const costoEnvio = tipoEnvio === 'estado' ? subtotal * 0.05 : 0;
    const costoInstalacion = requiereInstalacion ? subtotal * 0.10 : 0;
    const costoGarantia = garantiaExtendida ? subtotal * 0.15 : 0;
    const totalFinal = subtotal + costoEnvio + costoInstalacion + costoGarantia;

    const handleCompra = (e) => {
        e.preventDefault();

        // 1. CREAMOS EL OBJETO DEL NUEVO PEDIDO
        const nuevoPedido = {
            id: `PED-${Date.now().toString().slice(-6)}`,
            fecha: new Date().toLocaleDateString('es-MX'),
            total: totalFinal,
            estado: "Procesando",
            metodoPago: metodoPago === 'tarjeta' ? 'Tarjeta Crédito/Débito' : 'Monedero Electrónico',
            items: cart
        };

        // 2. GUARDAMOS EN HISTORIAL
        const historialActual = JSON.parse(localStorage.getItem('historial_compras')) || [];
        const historialActualizado = [nuevoPedido, ...historialActual];
        localStorage.setItem('historial_compras', JSON.stringify(historialActualizado));

        // 3. Limpieza y redirección
        alert(`¡Compra procesada con éxito!\nTotal: $${totalFinal.toLocaleString()}`);
        dispatch(setCart([]));
        navigate('/purchases');
    };

    if (cart.length === 0) return <div className="text-center mt-20 text-gray-500">No hay productos para pagar.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Compra</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* COLUMNA IZQUIERDA: FORMULARIO */}
                <div className="md:col-span-2 space-y-6">

                    {/* SECCION ENVIO */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-truck text-blue-600"></i> Método de Envío
                        </h2>
                        <div className="space-y-3">
                            <label className={`flex items-center justify-between p-4 border rounded cursor-pointer ${tipoEnvio === 'gdl' ? 'border-blue-500 bg-blue-50' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="envio" value="gdl" checked={tipoEnvio === 'gdl'} onChange={() => setTipoEnvio('gdl')} />
                                    <div>
                                        <p className="font-bold">Área Metropolitana de Guadalajara</p>
                                        <p className="text-sm text-gray-500">Entrega de 1 a 2 días hábiles</p>
                                    </div>
                                </div>
                                <span className="text-green-600 font-bold">GRATIS</span>
                            </label>

                            <label className={`flex items-center justify-between p-4 border rounded cursor-pointer ${tipoEnvio === 'estado' ? 'border-blue-500 bg-blue-50' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="envio" value="estado" checked={tipoEnvio === 'estado'} onChange={() => setTipoEnvio('estado')} />
                                    <div>
                                        <p className="font-bold">Interior del Estado</p>
                                        <p className="text-sm text-gray-500">Entrega de 3 a 5 días hábiles</p>
                                    </div>
                                </div>
                                <span className="text-blue-600 font-bold">+5% Cargo</span>
                            </label>
                        </div>
                    </div>

                    {/* SECCION PAGO */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <i className="fa-regular fa-credit-card text-blue-600"></i> Pago
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Medio de Pago</label>
                                <select className="w-full border p-2 rounded" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                                    <option value="monedero">Monedero Electrónico</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Plazos</label>
                                <select className="w-full border p-2 rounded" value={plazoPago} onChange={(e) => setPlazoPago(e.target.value)}>
                                    <option value="contado">De Contado</option>
                                    <option value="3msi">3 Meses sin intereses</option>
                                    <option value="6msi">6 Meses sin intereses</option>
                                    {/* --- AGREGADO 12 MESES --- */}
                                    <option value="12msi">12 Meses sin intereses</option>
                                </select>
                            </div>
                        </div>

                        {/* --- CAMPOS DE TARJETA (Regresaron) --- */}
                        {metodoPago === 'tarjeta' && (
                            <div className="mt-4 p-5 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Número de Tarjeta</label>
                                    <div className="relative">
                                        <i className="fa-brands fa-cc-visa absolute left-3 top-3 text-gray-400 text-lg"></i>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full pl-10 p-2 border rounded focus:border-blue-500 outline-none"
                                            maxLength="19"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha de Expiración</label>
                                        <input type="text" placeholder="MM/AA" className="w-full p-2 border rounded focus:border-blue-500 outline-none" maxLength="5" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVV</label>
                                        <div className="relative">
                                            <i className="fa-solid fa-lock absolute left-3 top-3 text-gray-400 text-xs"></i>
                                            <input type="password" placeholder="123" className="w-full pl-8 p-2 border rounded focus:border-blue-500 outline-none" maxLength="4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                    <i className="fa-solid fa-shield-halved text-green-600"></i>
                                    <span>Transacción encriptada y segura.</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* COLUMNA DERECHA: RESUMEN */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
                        <h2 className="text-xl font-bold mb-4">Resumen</h2>
                        <div className="space-y-3 mb-6 border-b pb-6">
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input type="checkbox" className="mt-1" checked={requiereInstalacion} onChange={(e) => setRequiereInstalacion(e.target.checked)} />
                                <div className="text-sm"><span className="block font-semibold">Instalación (+10%)</span></div>
                            </label>
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input type="checkbox" className="mt-1" checked={garantiaExtendida} onChange={(e) => setGarantiaExtendida(e.target.checked)} />
                                <div className="text-sm"><span className="block font-semibold">Garantía Extendida (+15%)</span></div>
                            </label>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                            {costoEnvio > 0 && <div className="flex justify-between text-blue-600"><span>Envío</span><span>+${costoEnvio.toLocaleString()}</span></div>}
                            {costoInstalacion > 0 && <div className="flex justify-between text-orange-600"><span>Instalación</span><span>+${costoInstalacion.toLocaleString()}</span></div>}
                            {costoGarantia > 0 && <div className="flex justify-between text-purple-600"><span>Garantía</span><span>+${costoGarantia.toLocaleString()}</span></div>}
                            <div className="border-t pt-4 mt-4 flex justify-between items-center font-bold text-xl text-gray-900">
                                <span>Total</span><span>${totalFinal.toLocaleString()}</span>
                            </div>
                        </div>

                        <button onClick={handleCompra} className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-black transition">
                            Pagar Ahora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;