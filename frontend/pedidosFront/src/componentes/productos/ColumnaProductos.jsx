import { IconButton } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const ColumnaProductos = (handlers) => [
   
    { field: 'codigo', headerName: 'Código', width: 150, headerAlign: 'center' },
    { field: 'nombre', headerName: 'Nombre', width: 450, align: 'left', headerAlign: 'center' },
    { field: 'costo_compra', headerName: 'Costo Compra', width: 110, align: 'right', headerAlign: 'center' },
    { field: 'costo_venta', headerName: 'Costo Venta', width: 110, align: 'right', headerAlign: 'center' },
    {
        field: 'editar',
        headerName: 'Editar',
        width: 110,
        align: 'center',
        renderCell: (params) => (
            <IconButton onClick={() => handlers.onEdit(params.row)}>
                <EditOutlinedIcon />
            </IconButton>
        ),
    },
];

export default ColumnaProductos