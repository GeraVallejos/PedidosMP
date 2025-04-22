import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import decodeJWT from "../helpers/decodeJWT";
import { useProveedorData } from "../hooks/useProveedorData";

const ProductosForm = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    unidad: "",
    cantidad_stock: "",
    cantidad_inventario: "",
    costo_compra: "",
    costo_venta: "",
    bodega: "",
    id_proveedor: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const {proveedor} = useProveedorData();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("success");


  console.log(proveedor)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Si el campo tiene un error y el usuario empieza a escribir, se elimina el error
  if (errors[name]) {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name]; // Eliminar el error específico
      return updatedErrors;
    });
  }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = "El código es obligatorio.";
    }

    if (!formData.nombre) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    if (!formData.cantidad_stock) {
      newErrors.cantidad_stock = "La cantidad es obligatoria.";
    }
    if (!formData.costo_compra) {
      newErrors.costo_compra = "El costo es obligatorio.";
    }
    if (!formData.bodega) {
      newErrors.bodega = "La bodega es obligatoria.";
    }
    if (!formData.id_proveedor) {
      newErrors.id_proveedor = "El proveedor es obligatorio.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.log("Token no encontrado");
      return;
    }
    const erroresValidacion = validateForm();
    if (!erroresValidacion) {
      return;
    }
    const id_usuario = decodeJWT(token);

    const data = {
      ...formData,
      costo_compra: parseFloat(formData.costo_compra),
      costo_venta: parseFloat(formData.costo_venta),
      id_proveedor: parseInt(formData.id_proveedor),
      id_usuario: id_usuario,
    };

    try {
      const respuesta = await axios.post("http://localhost:8000/api/v1/producto/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(respuesta)

      setMensaje(respuesta.mensaje || "Registro exitoso.");
      setAlertType('success')
      setOpenSnackbar(true)
      setFormData({
        codigo: "",
        nombre: "",
        unidad: "",
        cantidad_stock: "",
        cantidad_inventario: "",
        costo_compra: "",
        costo_venta: "",
        bodega: "",
        id_proveedor: "",
        descripcion: "",
      });
      setErrors({});
      
    } catch (error) {
      console.error("Error:", error);
      // Verifica si existe un error de duplicacion de codigo, el mensaje viene de Django
      if(error.response.data.codigo[0]){
        setMensaje('Este código ya existe')
        setAlertType('warning')
        setOpenSnackbar(true)
      }
      setTimeout(() => {
        setMensaje("");
      }, 2500);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Cerrar la alerta flotante
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "0.5rem auto",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Registro de Producto
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Código"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              error={!!errors.codigo}
              helperText={errors.codigo}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Unidad"
              name="unidad"
              value={formData.unidad}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Cantidad Inicial"
              name="cantidad_stock"
              type="number"
              value={formData.cantidad_stock}
              onChange={handleChange}
              error={!!errors.cantidad_stock}
              helperText={errors.cantidad_stock}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Cantidad Inventario"
              name="cantidad_inventario"
              type="number"
              value={formData.cantidad_inventario}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Costo Compra"
              name="costo_compra"
              type="number"
              value={formData.costo_compra}
              onChange={handleChange}
              error={!!errors.costo_compra}
              helperText={errors.costo_compra}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Costo Venta"
              name="costo_venta"
              type="number"
              value={formData.costo_venta}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Bodega"
              name="bodega"
              value={formData.bodega}
              onChange={handleChange}
              error={!!errors.bodega}
              helperText={errors.bodega}
            />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel>Proveedor</InputLabel>
              <Select
                name="id_proveedor"
                label='Proveedor'
                value={formData.id_proveedor}
                onChange={handleChange}
                error={!!errors.id_proveedor}
              >
                <MenuItem value="">
                  <em>Seleccione un proveedor</em>
                </MenuItem>
                {proveedor.map((proveedor) => (
                  <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                    {proveedor.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem", width: "100%" }}
        >
          Registrar Producto
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{mt: 6, ml: 18}}
      >
        <Alert
    onClose={handleCloseSnackbar}
    severity={alertType}
    variant="filled"
    sx={{ width: '100%' }}
  >
    {mensaje}
  </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductosForm;
