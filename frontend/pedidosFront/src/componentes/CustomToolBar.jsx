import { Box, Button } from "@mui/material"
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarFilterButton
}
    from "@mui/x-data-grid"
import SaveAltIcon from '@mui/icons-material/SaveAlt';

// eslint-disable-next-line react/prop-types
const CustomToolBar = ({ onExport }) => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <Box sx={{ flexGrow: 1 }} />
            <Button
                onClick={onExport}
                startIcon={<SaveAltIcon />}
                variant="text"
                size="small"
                
            >
                Exportar
            </Button>

            {/* Botón estándar del DataGrid */}
        </GridToolbarContainer>
    )
}

export default CustomToolBar