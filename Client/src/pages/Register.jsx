import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState("");

    const onSubmit = (data) => {

        const usuarioNuevo = {
            ...data,
            rol: 'cliente'
        };

        // Simulamos el registro 
        console.log("Datos a registrar:", usuarioNuevo);


        fetch("https://api-easyelectroshop.onrender.com/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioNuevo)
        })
            .then(res => {

                alert("¡Registro exitoso! (Simulado)");
                navigate("/login");
            })
            .catch(error => {

                alert("¡Registro exitoso! (Simulado)");
                navigate("/login");
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

                {serverError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Campo: Nombre Completo  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fullName ? 'border-red-500' : ''}`}
                            placeholder="Ej. Juan Pérez"
                            {...register("fullName", { required: "El nombre es obligatorio" })}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs italic mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Campo: Correo  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="ejemplo@correo.com"
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Correo inválido"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Campo: Número Telefónico  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                        <input
                            type="tel"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="10 dígitos"
                            {...register("phone", {
                                required: "El teléfono es obligatorio",
                                minLength: { value: 10, message: "Debe tener 10 dígitos" },
                                maxLength: { value: 10, message: "Debe tener 10 dígitos" }
                            })}
                        />
                        {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* Campo: Contraseña */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                        <input
                            type="password"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="********"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: { value: 6, message: "Mínimo 6 caracteres" }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Botón de Registro */}
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            type="submit"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-500 text-xs mt-4">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500 hover:text-blue-800">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;