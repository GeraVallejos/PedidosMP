import { useEffect, useState } from "react"
import axios from "axios";


const ProductosForm = () => {

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        unidad: '',
        cantidad_stock: '',
        cantidad_inventario: '',
        costo_compra: '',
        costo_venta: '',
        bodega: '',
        id_proveedor: '',
        descripcion: '',
    });

    const [errors, setErrors] = useState({});
    const [mensaje, setMensaje] = useState("");
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        const fetchProveedores = async () => {
            const response = await axios.get("http://localhost:8000/api/v1/proveedor/");
            setProveedores(response.data);
        };
        fetchProveedores();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.codigo.trim()) {
            newErrors.codigo = 'El código es obligatorio.';
        }

        if (!formData.nombre) {
            newErrors.nombre = 'El nombre es obligatorio.';
        }

        if (!formData.cantidad_stock) {
            newErrors.cantidad_stock = 'La cantidad es obligatoria.';
        }
        if (!formData.costo_compra) {
            newErrors.costo_compra = 'El costo es obligatorio.';
        }
        if (!formData.bodega) {
            newErrors.bodega = 'La bodega es obligatoria.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.log('Token no encontrado');
            return;
        } else {
            console.log('este es tu token: ' + token)
        }
        const erroresValidacion = validateForm();
        if (!erroresValidacion) {
            return;
        }

        const data = {codigo: formData.codigo,
            nombre: formData.nombre,
            unidad: formData.unidad,
            cantidad_stock: formData.cantidad_stock,
            cantidad_inventario: formData.cantidad_inventario,
            costo_compra: parseFloat(formData.costo_compra),
            costo_venta: parseFloat(formData.costo_venta),
            bodega: formData.bodega,
            id_proveedor: parseInt(formData.id_proveedor),
            descripcion: formData.descripcion,}
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:8000/api/v1/producto/", {
                data
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Token de autenticación
                    }
                });

            setMensaje(respuesta.data.mensaje || "Registro exitoso.");
            setFormData({
                codigo: '',
                nombre: '',
                unidad: '',
                cantidad_stock: '',
                cantidad_inventario: '',
                costo_compra: '',
                costo_venta: '',
                bodega: '',
                id_proveedor: '',
                descripcion: '',
            });
            setErrors({});
        } catch (error) {
            console.log(error.response)
            setMensaje(
                error.response?.data?.mensaje || "Ocurrió un error en el registro."
            );
        }
    };

    return (
        <>
            <h2>Registro de Producto</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="codigo">Código:</label>
                    <input
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.codigo && <p style={{ color: 'red' }}>{errors.codigo}</p>}
                </div>
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
                    <label htmlFor="unidad">Unidad:</label>
                    <input
                        type="text"
                        id="unidad"
                        name="unidad"
                        value={formData.unidad}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.unidad && <p style={{ color: 'red' }}>{errors.unidad}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="cantidad_stock">Cantidad Inicial:</label>
                    <input
                        type="number"
                        id="cantidad_stock"
                        name="cantidad_stock"
                        value={formData.cantidad_stock}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.cantidad_stock && <p style={{ color: 'red' }}>{errors.cantidad_stock}</p>}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="cantidad_inventario">cantidad_inventario :</label>
                    <input
                        type="number"
                        id="cantidad_inventario"
                        name="cantidad_inventario"
                        value={formData.cantidad_inventario}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.cantidad_inventario && <p style={{ color: 'red' }}>{errors.cantidad_inventario}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="costo_compra">Costo Compra:</label>
                    <input
                        type="number"
                        id="costo_compra"
                        name="costo_compra"
                        value={formData.costo_compra}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.costo_compra && <p style={{ color: 'red' }}>{errors.costo_compra}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="costo_venta">Costo Venta:</label>
                    <input
                        type="number"
                        id="costo_venta"
                        name="costo_venta"
                        value={formData.costo_venta}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.costo_venta && <p style={{ color: 'red' }}>{errors.costo_venta}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="bodega">bodega:</label>
                    <input
                        type="text"
                        id="bodega"
                        name="bodega"
                        value={formData.bodega}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                    {errors.bodega && <p style={{ color: 'red' }}>{errors.bodega}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="id_proveedor">Proveedor:</label>
                    <select
                        id="id_proveedor"
                        name="id_proveedor"
                        value={formData.id_proveedor}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    >
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                {proveedor.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.id_proveedor && <p style={{ color: 'red' }}>{errors.id_proveedor}</p>}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="descripcion">Descripcion:</label>
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

                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Ingresar Producto
                </button>
            </form>
        </>
    )
}

export default ProductosForm