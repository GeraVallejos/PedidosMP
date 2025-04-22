import { format } from 'date-fns';
import { Checkbox, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const ColumnaPedidos = (handlers) => [
    {
        field: 'resuelto',
        headerName: 'Finalizar',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
            <Checkbox
                checked={params.value}
                onChange={() => handlers.onStatusChange(params.row.id_pedido, params.value, params.row)}
            />
        ),
    },
    { field: 'pedidos_producto', headerName: 'Producto', width: 340, headerAlign: 'center' },
    { field: 'cantidad', headerName: 'Cantidad', width: 100, align: 'right', headerAlign: 'center' },
    {
        field: 'fecha_pedido', 
        headerName: 'Fecha Creación', 
        width: 150, 
        align: 'center', 
        headerAlign: 'center',
        valueFormatter: (params) => format(new Date(params), 'dd/MM/yyyy')
    },
    {
        field: 'fecha_despacho', 
        headerName: 'Fecha Despacho', 
        width: 130, 
        align: 'center', 
        headerAlign: 'center', 
        valueFormatter: (params) => format(new Date(params), 'dd/MM/yyyy')
    },
    {
        field: 'editar',
        headerName: 'Editar',
        headerAlign: 'center',
        width: 90,
        align: 'center',
        renderCell: (params) => (
            <IconButton onClick={() => handlers.onEdit(params.row)}>
                <EditOutlinedIcon />
            </IconButton>
        ),
    },
    {
        field: 'borrar',
        headerName: 'Borrar',
        width: 60,
        align: 'center',
        renderCell: (params) => (
            <IconButton onClick={() => handlers.onDelete(params.row.id_pedido)}>
                <DeleteForeverIcon sx={{ color: 'red' }} />
            </IconButton>
        ),
    },
];

export default ColumnaPedidos