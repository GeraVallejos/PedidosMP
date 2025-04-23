import { useEffect, useRef, useState } from "react";
import api from "../helpers/interceptorJWT";
import BaseForm from "./BaseForm";
import { 
  TextField,
  MenuItem,
  FormHelperText,
  InputAdornment, 
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import AppSnackbar from "../componentes/AppSnackbar";

// eslint-disable-next-line react/prop-types
const PedidosForm = ({ onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    cantidad: "",
    fecha_despacho: null,
    id_producto: "",
    id_proveedor: "",
  });

  const [errors, setErrors] = useState({});
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const snackbarRef = useRef();

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
        snackbarRef.current.show("Error al cargar los datos necesarios", "error");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, fecha_despacho: date });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cantidad) {
      newErrors.cantidad = "La cantidad es obligatoria";
    } else if (parseInt(formData.cantidad) <= 0) {
      newErrors.cantidad = "La cantidad debe ser mayor a cero";
    }
    
    if (!formData.id_producto) {
      newErrors.id_producto = "Debe seleccionar un producto";
    }
    
    if (!formData.id_proveedor) {
      newErrors.id_proveedor = "Debe seleccionar un proveedor";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      snackbarRef.current.show("No se encontró token de autenticación", "error");
      setIsSubmitting(false);
      return;
    }

    const data = {
      cantidad: parseInt(formData.cantidad),
      fecha_despacho: formData.fecha_despacho || null,
      id_producto: parseInt(formData.id_producto),
      id_proveedor: parseInt(formData.id_proveedor),
    };

    try {
      const respuesta = await api.post(
        "http://localhost:8000/api/v1/pedido/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      snackbarRef.current.show(respuesta.data?.mensaje || "Pedido registrado exitosamente", "success");
      if (onSaveSuccess) onSaveSuccess();
      
      // Reset form
      setFormData({
        cantidad: "",
        fecha_despacho: null,
        id_producto: "",
        id_proveedor: "",
      });
      
    } catch (error) {
      if (error.response) {
        console.error("Error en la respuesta del servidor:", error.response.data);
        snackbarRef.current.show(
          error.response.data?.mensaje || "Error al registrar el pedido",
          "error"
        );
      } else {
        console.error("Error en la solicitud:", error.message);
        snackbarRef.current.show("Error al conectar con el servidor", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <BaseForm
      title="Nuevo Pedido"
      onSave={handleSubmit}
      saveText={isSubmitting ? "Registrando..." : "Registrar Pedido"}
      maxWidth="md"
    >
     
      {/* Campo Cantidad */}
      <Grid size={{xs:12, sm:6}}>
        <TextField
          fullWidth
          label="Cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          required
          type="number"
          error={!!errors.cantidad}
          helperText={errors.cantidad}
          InputProps={{
            endAdornment: <InputAdornment position="end">unidades</InputAdornment>,
            inputProps: { min: 1 }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#a7b6c2',
              },
            }
          }}
        />
      </Grid>

      {/* Campo Fecha de Despacho */}
      <Grid size={{xs:12, sm:6}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha de Despacho"
            value={formData.fecha_despacho}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#a7b6c2',
                    },
                  },
                },
              }
            }}
          />
        </LocalizationProvider>
      </Grid>

      {/* Campo Producto */}
      <Grid xs={12} sm={6} size={12}>
        <FormControl fullWidth error={!!errors.id_producto}>
          <InputLabel id="producto-label">Producto *</InputLabel>
          <Select
            labelId="producto-label"
            label="Producto *"
            name="id_producto"
            value={formData.id_producto}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#a7b6c2',
              },
            }}
          >
            <MenuItem value="">
              <em>Seleccione un producto</em>
            </MenuItem>
            {productos.map((producto) => (
              <MenuItem key={producto.id_producto} value={producto.id_producto}>
                {producto.nombre}
              </MenuItem>
            ))}
          </Select>
          {errors.id_producto && (
            <FormHelperText>{errors.id_producto}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/* Campo Proveedor */}
      <Grid xs={12} sm={6} size={12}>
        <FormControl fullWidth error={!!errors.id_proveedor}>
          <InputLabel id="proveedor-label">Proveedor *</InputLabel>
          <Select
            labelId="proveedor-label"
            label="Proveedor *"
            name="id_proveedor"
            value={formData.id_proveedor}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#a7b6c2',
              },
            }}
          >
            <MenuItem value="">
              <em>Seleccione un proveedor</em>
            </MenuItem>
            {proveedores.map((proveedor) => (
              <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                {proveedor.nombre}
              </MenuItem>
            ))}
          </Select>
          {errors.id_proveedor && (
            <FormHelperText>{errors.id_proveedor}</FormHelperText>
          )}
        </FormControl>
      </Grid>
    </BaseForm>
    <AppSnackbar ref={snackbarRef} />
    </>
  );
};

export default PedidosForm;