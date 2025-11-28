import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    // Estados para los campos y alertas
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    // Si ya está logueado, lo mandamos al Home
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Datos a enviar al backend
        const data = {
            correo: correo,
            password: password
        };

        // Petición al Backend 
        fetch("https://api-easyelectroshop.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) throw new Error("Error en login");
                return res.json();
            })
            .then(resp => {
                // Guardamos sesión simulada en LocalStorage 
                localStorage.setItem('token', "token-simulado-123");
                localStorage.setItem('user', JSON.stringify(resp.usuario));
                navigate("/");
            })
            .catch(err => {
                console.error(err);
                setError(true);
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                {/* Título: Inicio de Sesión */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Inicio de Sesión</h2>

                {/* Mensaje de Error */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">Credenciales incorrectas. Intenta con cualquier correo.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Campo: Correo */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="ejemplo@correo.com"
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo: Contraseña */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="******************"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Botón de Ingresar */}
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            type="submit"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-500 text-xs mt-4">
                    ¿No tienes cuenta? <Link to="/register" className="text-blue-500 hover:text-blue-800">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;