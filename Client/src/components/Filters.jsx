import React, { useState } from 'react';

const Filters = ({ onFilter, categorias }) => {
    // Estados locales para los filtros
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [precioMaximo, setPrecioMaximo] = useState(20000);

    // Función que se ejecuta cada vez que cambia un input
    const aplicarFiltros = (e) => {
        // Prevenimos recarga si es un submit de formulario
        if (e && e.preventDefault) e.preventDefault();

        // Enviamos todos los valores actuales al componente Home
        onFilter({
            nombre: busqueda,
            categoria: categoriaSeleccionada,
            precio: precioMaximo
        });
    };

    // Manejadores específicos para actualizar el estado y filtrar al mismo tiempo
    const handleSearchChange = (e) => {
        const valor = e.target.value;
        setBusqueda(valor);
        onFilter({ nombre: valor, categoria: categoriaSeleccionada, precio: precioMaximo });
    };

    const handleCategoryChange = (e) => {
        const valor = e.target.value;
        setCategoriaSeleccionada(valor);
        onFilter({ nombre: busqueda, categoria: valor, precio: precioMaximo });
    };

    const handlePriceChange = (e) => {
        const valor = Number(e.target.value);
        setPrecioMaximo(valor);
        onFilter({ nombre: busqueda, categoria: categoriaSeleccionada, precio: valor });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
            <form onSubmit={aplicarFiltros} className="flex flex-col md:flex-row gap-6 items-end">

                {/* 1. Buscador por Texto */}
                <div className="flex-grow w-full">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Buscar</label>
                    <div className="relative">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Ej. Refrigerador..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                            value={busqueda}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* 2. Filtro por Categoría */}
                <div className="w-full md:w-1/4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Categoría</label>
                    <select
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                        value={categoriaSeleccionada}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* 3. Filtro por Precio Máximo */}
                <div className="w-full md:w-1/4">
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Precio Máximo</label>
                        <span className="text-xs font-bold text-blue-600">${precioMaximo.toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        value={precioMaximo}
                        onChange={handlePriceChange}
                    />
                </div>

            </form>
        </div>
    );
};

export default Filters;