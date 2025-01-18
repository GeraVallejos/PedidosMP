import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"


// eslint-disable-next-line react/prop-types
const ModalDetallePedido = ({open, onClose, selectedRow}) => {

    if (!selectedRow) {
        return null; // No renderizamos nada si no hay selectedRow
    }

    // eslint-disable-next-line react/prop-types
    const {id_pedido, productos_usuario, pedidos_producto, cantidad, pedidos_proveedor, fecha_pedido, fecha_modificacion, fecha_despacho, resuelto} = selectedRow

  return (
    <Dialog open={open} onClose={onClose}>
                <DialogTitle>Detalles del Pedido</DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <>
                            <TextField
                                label="ID Pedido"
                                value={id_pedido}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Usuario"
                                value={productos_usuario}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Producto"
                                value={pedidos_producto}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Cantidad"
                                value={cantidad}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Empresa"
                                value={pedidos_proveedor}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Fecha Pedido"
                                value={fecha_pedido}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Fecha Modificación"
                                value={fecha_modificacion}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Fecha Despacho"
                                value={fecha_despacho}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Resuelto"
                                value={resuelto ? "Sí" : "No"}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
  )
}

export default ModalDetallePedido