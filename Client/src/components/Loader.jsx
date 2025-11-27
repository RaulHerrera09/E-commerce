import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center">
                {/* Spinner animado con Tailwind */}
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-semibold animate-pulse">Cargando...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;