import { useState } from 'react';
import axios from 'axios';


const RegistroForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        username: '',
        password: '',
        cargo: '',
        rut: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [mensaje, setMensaje] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio.';
        }

        if (!formData.correo.trim()) {
            newErrors.correo = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            newErrors.correo = 'El correo electrónico no es válido.';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const erroresValidacion = validateForm();
        if (Object.keys(erroresValidacion).length > 0) {
            setErrors(erroresValidacion);
            return;
        }

        try {
            const respuesta = await axios.post("http://localhost:8000/api/v1/usuario/", {
                nombre: formData.nombre,
                apellido: formData.apellido,
                correo: formData.correo,
                username: formData.username,
                password: formData.password,
                cargo: formData.cargo,
                rut: formData.rut
            });

            setMensaje(respuesta.data.mensaje || "Registro exitoso.");
            setFormData({
                nombre: '',
                apellido: '',
                correo: '',
                username: '',
                password: '',
                cargo: '',
                rut: '',
                confirmPassword: ''
            });
            setErrors({});
        } catch (error) {
            setMensaje(
                error.response?.data?.mensaje || "Ocurrió un error en el registro."
            );
        }
    };

    return (
        <>
            <h2>Registro de Usuario</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.apellido && <p style={{ color: 'red' }}>{errors.apellido}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="correo">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.correo && <p style={{ color: 'red' }}>{errors.correo}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="cargo">Cargo:</label>
                    <input
                        type="text"
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.cargo && <p style={{ color: 'red' }}>{errors.cargo}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="rut">Rut:</label>
                    <input
                        type="text"
                        id="rut"
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.rut && <p style={{ color: 'red' }}>{errors.rut}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                </div>

                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Registrarse
                </button>
            </form>
        </>
    );
};

export default RegistroForm;
