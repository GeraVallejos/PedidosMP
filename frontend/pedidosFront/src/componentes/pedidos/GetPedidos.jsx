import { useState } from "react"
import api from "../../helpers/interceptorJWT";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Checkbox, Container, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AlertaConfirmacion from "../AlertaConfirmacion";
import ModalDetallePedido from "../../modals/ModalDetallePedido";
import Loading from "../Loading";
import FetchPedido from "../../hooks/fetchPedidos";
import esDataGrid from "../../helpers/DataGridTextEs";
import { format } from 'date-fns'
import * as XLSX from "xlsx"
import CustomToolBar from "../CustomToolBar";



// eslint-disable-next-line react/prop-types
const GetPedidos = ({ estado }) => {

    const [pedido, setPedido] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogParams, setDialogParams] = useState(null);
    const handleOpenDialog = (id, currentResueltoValue, pedidoData) => {
        setDialogParams({ id, currentResueltoValue, pedidoData });
        setOpenDialog(true);
    };
    const handleCloseDialog = () => setOpenDialog(false);


    const columns = [
        {
            field: 'resuelto',
            headerName: 'Finalizar',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Checkbox
                        checked={params.value}
                        onChange={() => {
                            handleOpenDialog(params.row.id_pedido, params.value, params.row);
                        }}

                    />
                );
            },
        },
        { field: 'pedidos_producto', headerName: 'Producto', width: 350, headerAlign: 'center' },
        { field: 'cantidad', headerName: 'Cantidad', width: 100, align: 'center', headerAlign: 'center' },
        {
            field: 'fecha_pedido', headerName: 'Fecha Creación', width: 120, align: 'center', headerAlign: 'center', // Cambia el formato de la fecha desde el front
            valueFormatter: (params) => {
                const date = new Date(params);
                return format(date, 'dd/MM/yyyy');
            }
        },
        {
            field: 'fecha_despacho', headerName: 'Fecha Despacho', width: 130, align: 'center', headerAlign: 'center', valueFormatter: (params) => {
                const date = new Date(params);
                return format(date, 'dd/MM/yyyy');
            }
        },

        // Columna para editar
        {
            field: 'editar',
            headerName: 'Editar',
            width: 100,
            align: 'center',
            renderCell: (params) => (
                <IconButton onClick={() => handleEdit(params.row)}>
                    <EditOutlinedIcon />
                </IconButton>
            ),
        },

        // Columna para borrar
        {
            field: 'borrar',
            headerName: 'Borrar',
            width: 60,
            align: 'center',
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.id_pedido)}>
                    <DeleteForeverIcon sx={{ color: 'red' }} />
                </IconButton>
            ),
        },
    ];

    //Hook para renderizar los pedidos deseados, estado depende de si quiero ver resueltos o no
    FetchPedido(setPedido, setLoading, setError, estado)

    const handleConfirmAction = async () => {
        if (!dialogParams) return;

        const { id, currentResueltoValue, pedidoData } = dialogParams;
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No autorizado, falta token de autenticación');
            }

            const newResueltoValue = !currentResueltoValue; // Si estaba `true`, será `false` y viceversa
            const updatedPedido = {
                ...pedidoData,
                resuelto: newResueltoValue,

            };

            const response = await api.put(
                `http://localhost:8000/api/v1/pedido/${id}/`,
                updatedPedido,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Actualizamos el estado local con el nuevo valor de "resuelto"
                setPedido(prevData => prevData.map(item =>
                    item.id_pedido === id ? { ...item, resuelto: newResueltoValue } : item
                ));
            } else {
                setError('Error al actualizar el estado');
            }
        } catch (error) {
            console.log(error.response?.data)
            setError('Error en la carga de datos');
        }
    };

    const handleEdit = (row) => {
        setSelectedRow(row); // Guardamos la fila seleccionada
        setOpenModal(true); // Abrimos el modal
    };

    // Función para borrar una fila
    const handleDelete = (id) => {
        setPedido(prevData => prevData.filter(item => item.id_pedido !== id));
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRow(null);
    };

    // Función para exportar a Excel
    const handleExport = () => {
        if (pedido.length === 0) {
            console.log("No hay datos para exportar");
            return;
          }
        
          // Crear una nueva estructura con encabezados personalizados
          const formattedData = pedido.map((row) => ({
            "Producto": row.pedidos_producto,
            "Cantidad": row.cantidad,
            "Usuario": row.productos_usuario,
            "Fecha de Creación": row.fecha_pedido,
            "Fecha de Despacho": row.fecha_despacho,
            "Finalizado": row.resuelto ? "Sí" : "No",
          }));
        // Convertir los datos del DataGrid a formato de hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();

        // Agregar la hoja de cálculo al libro de trabajo
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");

        // Generar archivo Excel y desencadenar descarga
        XLSX.writeFile(workbook, "Pedidos.xlsx");
    };

    return (
        <Box sx={{ p: 0, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: "100%", height: "78vh" }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                }}
            >
                <Loading loading={loading} error={error} />
            </Box>

            {!loading && !error && (
                <Container sx={{ ml: -5, height: 500, width: '100%', marginRight: '3px' }}>
                    {/* el DataGrid contiene un boton diferente para exportar a xlxs */}
                    <DataGrid
                        rows={pedido}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[10]}
                        disableRowSelectionOnClick
                        getRowId={(row) => row.id_pedido}
                        slots={{ toolbar: CustomToolBar}}
                        slotProps={{toolbar: {onExport: handleExport}}}
                        localeText={esDataGrid}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'fecha_pedido', sort: 'asc' }],
                            },
                        }}
                    />

                    <div>
                        <AlertaConfirmacion
                            open={openDialog}
                            onClose={handleCloseDialog}
                            onConfirm={handleConfirmAction}
                            mensaje={'Esta acción dará por terminado este pedido'}
                        />
                    </div>
                    <ModalDetallePedido open={openModal} onClose={handleCloseModal} selectedRow={selectedRow} />
                </Container>
            )}
        </Box>
    );
}
export default GetPedidos