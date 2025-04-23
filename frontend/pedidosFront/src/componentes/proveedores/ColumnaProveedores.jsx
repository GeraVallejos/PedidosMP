import { IconButton } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const ColumnaProveedores = (handlers) => [
   
    { field: 'rut', headerName: 'Rut', width: 100, headerAlign: 'center' },
    { field: 'nombre', headerName: 'Nombre', width: 200, headerAlign: 'center' },
    { field: 'direccion', headerName: 'Direccion', width: 300, align: 'left', headerAlign: 'center' },
    { field: 'comuna', headerName: 'Comuna', width: 150, align: 'left', headerAlign: 'center' },
    { field: 'contacto', headerName: 'Contacto', width: 160, align: 'left', headerAlign: 'center' },
    { field: 'telefono', headerName: 'Teléfono', width: 110, align: 'right', headerAlign: 'center' },
    { field: 'giro', headerName: 'Giro', width: 200, align: 'left', headerAlign: 'center' },
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

export default ColumnaProveedores