/* eslint-disable react/prop-types */
import { Box, Container } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import CustomToolBar from "../componentes/CustomToolBar";
import AlertaConfirmacion from "../componentes/AlertaConfirmacion";
import Loading from "../componentes/Loading";

const GetData = ({
    data,
    loading,
    error,
    columns,
    getRowId,
    openModal,
    selectedRow,
    openDialog,
    dialogMessage,
    onCloseModal,
    onExport,
    onCloseDialog,
    onConfirmAction,
    ModalDetalleEntidad,
    orden
}) => {
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
                    <DataGrid
                        rows={data}
                        columns={columns}
                        density="compact"
                        pageSize={5}
                        rowsPerPageOptions={[10]}
                        disableRowSelectionOnClick
                        getRowId={getRowId}
                        slots={{ toolbar: CustomToolBar }}
                        slotProps={{ toolbar: { onExport } }}
                        localeText={{
                            noRowsLabel: "No hay datos disponibles",
                            toolbarColumns: 'Columnas',
                            toolbarFilters: 'Filtros',
                            
                        }}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: orden, sort: 'asc' }],
                            },
                        }}
                    />

                    <AlertaConfirmacion
                        open={openDialog}
                        onClose={onCloseDialog}
                        onConfirm={onConfirmAction}
                        mensaje={dialogMessage}
                    />
                    {ModalDetalleEntidad && <ModalDetalleEntidad open={openModal} onClose={onCloseModal} selectedRow={selectedRow} />}
                </Container>
            )}
        </Box>
    );
};

export default GetData;
