import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Columna 1 */}
                <div>
                    <h3 className="text-xl font-bold mb-4">E-commerce</h3>
                    <p className="text-gray-400 text-sm">
                        La mejor tienda de electrodomésticos online. Calidad y garantía en cada compra.
                    </p>
                </div>

                {/* Columna 2 */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Contacto</h3>
                    <ul className="text-gray-400 text-sm space-y-2">
                        <li><i className="fa-solid fa-phone mr-2"></i> +52 555 123 4567</li>
                        <li><i className="fa-solid fa-envelope mr-2"></i> soporte@ecommerce.com</li>
                        <li><i className="fa-solid fa-location-dot mr-2"></i> Guadalajara, Jal.</li>
                    </ul>
                </div>

                {/* Columna 3 */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Síguenos</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-600 text-xs mt-8 border-t border-gray-800 pt-4">
                &copy; {new Date().getFullYear()} E-commerce Inc. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;