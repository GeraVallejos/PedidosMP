import { useState } from "react"
import axios from "axios";


const ProveedorForm = () => {

    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        comuna: '',
        contacto: '',
        telefono: '',
        descripcion: '',
        rut: '',
        giro: '',
        id_usuario: ''
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

        if (!formData.direccion) {
            newErrors.direccion = 'La dirección es obligatoria.';
        }

        if (!formData.comuna) {
            newErrors.comuna = 'La comuna es obligatoria.';
        }
        if (!formData.contacto) {
            newErrors.contacto = 'El contacto es obligatorio.';
        }
        if (!formData.telefono) {
            newErrors.telefono = 'El telefono es obligatorio.';
        }
        if (!formData.rut) {
            newErrors.rut = 'El rut es obligatorio.';
        }
        if (!formData.giro) {
            newErrors.giro = 'El giro es obligatorio.';
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
            const respuesta = await axios.post("http://localhost:8000/api/v1/proveedor/", {
                nombre: formData.nombre,
                direccion: formData.direccion,
                comuna: formData.comuna,
                contacto: formData.contacto,
                telefono: formData.telefono,
                descripcion: formData.descripcion,
                rut: formData.rut,
                giro: formData.giro,
                id_usuario: formData.id_usuario
            });

            setMensaje(respuesta.data.mensaje || "Registro exitoso.");
            setFormData({
                nombre: '',
                direccion: '',
                comuna: '',
                contacto: '',
                telefono: '',
                descripcion: '',
                rut: '',
                giro: '',
                id_usuario: ''
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
            <h2>Registro de Proveedor</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="nombre">Nombre:</label>
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
                    <label htmlFor="direccion">direccion:</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.direccion && <p style={{ color: 'red' }}>{errors.direccion}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="comuna">comuna:</label>
                    <input
                        type="text"
                        id="comuna"
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.comuna && <p style={{ color: 'red' }}>{errors.comuna}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="contacto">contacto:</label>
                    <input
                        type="text"
                        id="contacto"
                        name="contacto"
                        value={formData.contacto}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.contacto && <p style={{ color: 'red' }}>{errors.contacto}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="telefono">telefono:</label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.telefono && <p style={{ color: 'red' }}>{errors.telefono}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="descripcion">descripcion:</label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.descripcion && <p style={{ color: 'red' }}>{errors.descripcion}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="rut">rut:</label>
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
                    <label htmlFor="giro">giro:</label>
                    <input
                        type="text"
                        id="giro"
                        name="giro"
                        value={formData.giro}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.giro && <p style={{ color: 'red' }}>{errors.giro}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="id_usuario">id_usuario:</label>
                    <input
                        type="text"
                        id="id_usuario"
                        name="id_usuario"
                        value={formData.id_usuario}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.id_usuario && <p style={{ color: 'red' }}>{errors.id_usuario}</p>}
                </div>

                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Ingresar Proveedor
                </button>
            </form>
        </>
    )
}

export default ProveedorForm