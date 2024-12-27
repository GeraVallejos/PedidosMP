import { useEffect, useState } from "react";
import axios from "axios";
import api from "../helpers/interceptorJWT";

const PedidosForm = () => {
  const [formData, setFormData] = useState({
    cantidad: "",
    fecha_despacho: "",
    id_producto: "",
    id_proveedor: "",
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
          const [productosResponse, proveedoresResponse] = await Promise.all([
              api.get("http://localhost:8000/api/v1/producto/"),
              api.get("http://localhost:8000/api/v1/proveedor/")
          ]);

          setProductos(productosResponse.data);
          setProveedores(proveedoresResponse.data);
      } catch (error) {
          console.error("Error al cargar datos:", error.message);
      }
  };

  fetchData();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cantidad) {
      newErrors.cantidad = "La cantidad es obligatoria.";
    }
    if (!formData.id_producto) {
      newErrors.id_producto = "El producto es obligatorio.";
    }
    if (!formData.id_proveedor) {
      newErrors.id_proveedor = "El proveedor es obligatorio.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    const erroresValidacion = validateForm();
    if (!erroresValidacion) {
      return;
    }
    const data = {
      cantidad: parseInt(formData.cantidad),
      fecha_despacho: formData.fecha_despacho || null,
      id_producto: parseInt(formData.id_producto),
      id_proveedor: parseInt(formData.id_proveedor),
    };

    try {
      const respuesta = await axios.post(
        "http://localhost:8000/api/v1/pedido/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMensaje(respuesta.mensaje || "Registro exitoso.");
      setFormData({
        cantidad: "",
        fecha_despacho: "",
        id_producto: "",
        id_proveedor: "",
      })
    } catch (error) {
      if (error.response) {
        console.error("Error en la respuesta del servidor:", error.response.data);
        setMensaje(
          error.response.data.mensaje || "Error al registrar el pedido."
        );
      } else {
        console.error("Error en la solicitud:", error.message);
        setMensaje("Error al registrar el pedido.");
      }
    }
  };

  return (
    <>
      <h2>Registro de Pedido</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          {errors.cantidad && <p style={{ color: "red" }}>{errors.cantidad}</p>}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="fecha_despacho">Fecha de Despacho:</label>
          <input
            type="datetime-local"
            id="fecha_despacho"
            name="fecha_despacho"
            value={formData.fecha_despacho}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="id_producto">Producto:</label>
          <select
            id="id_producto"
            name="id_producto"
            value={formData.id_producto}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id_producto} value={producto.id_producto}>
                {producto.nombre}
              </option>
            ))}
          </select>
          {errors.id_producto && <p style={{ color: "red" }}>{errors.id_producto}</p>}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="id_proveedor">Proveedor:</label>
          <select
            id="id_proveedor"
            name="id_proveedor"
            value={formData.id_proveedor}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
          {errors.id_proveedor && <p style={{ color: "red" }}>{errors.id_proveedor}</p>}
        </div>

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Registrar Pedido
        </button>
      </form>
    </>
  );
};

export default PedidosForm;