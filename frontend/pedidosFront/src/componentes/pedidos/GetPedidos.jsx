// 
import { useRef, useState } from 'react';
import { useTablaOperaciones } from "../../hooks/useTablaOperaciones";
import { usePedidosData } from "../../hooks/usePedidosData";
import ColumnaPedidos from "./ColumnaPedidos";
import ModalDetallePedido from "../../modals/ModalDetallePedido";
import ModalConfirmDelete from "../../modals/ModalConfirmDelete";
import GetData from "../GetData";
import AppSnackbar from '../AppSnackbar';

// eslint-disable-next-line react/prop-types
const GetPedidos = ({ estado, nombre_exportar }) => {
    const {
        pedido,
        loading,
        error,
        updatePedido,
        verifyPasswordAndDelete,
        setPedido,
        errorModal,
        setErrorModal,
    } = usePedidosData(estado);

    const {
        selectedRow,
        openModal,
        openDialog,
        dialogParams,
        setOpenModal,
        handleOpenDialog,
        handleCloseDialog,
        handleEdit,
        handleExport,
    } = useTablaOperaciones();

    // Estados para el modal de eliminación
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [pedidoToDelete, setPedidoToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const snackbarRef = useRef();


    // Mensaje dinámico para el diálogo
    const getDialogMessage = (currentValue) => {
        return currentValue
            ? "Esta acción reactivará este pedido (ya no estará marcado como terminado)"
            : "Esta acción dará por terminado este pedido";
    };

    // Lógica para actualizar estado del pedido
    const handleConfirmAction = async () => {
        if (!dialogParams) return;

        const { id, currentValue, rowData } = dialogParams;
        const success = await updatePedido(id, {
            ...rowData,
            resuelto: !currentValue,
        });

        if (success) {
            setPedido(prev => prev.map(p => p.id_pedido === id ? { ...p, resuelto: !currentValue } : p));
            snackbarRef.current.show(`Pedido ${!currentValue ? 'marcado como terminado' : 'reactivado'}`,
                'success');
        }

        handleCloseDialog();
    };


    // Manejar eliminación con verificación de contraseña
    const handleDeleteClick = (id) => {
        setPedidoToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async (id, password) => {
        setIsDeleting(true);
        try {
            const success = await verifyPasswordAndDelete(id, password);
            if (success) {
                snackbarRef.current.show("Pedido borrado con éxito", "success");
                setDeleteModalOpen(false);
            } else if (errorModal) {
                snackbarRef.current.show(errorModal, "error");
            }
            return success;
        } catch (error) {
            snackbarRef.current.show("Error al eliminar el pedido", "error");
            return false;
        } finally {
            setIsDeleting(false);
        }
    };

    // Configuración de columnas
    const columns = ColumnaPedidos({
        onStatusChange: handleOpenDialog,
        onEdit: handleEdit,
        onDelete: handleDeleteClick,
    });

    // Mapeo para exportación
    const exportMapping = {
        pedidos_producto: "Producto",
        cantidad: "Cantidad",
        productos_usuario: "Usuario",
        fecha_pedido: "Fecha de Creación",
        fecha_despacho: "Fecha de Despacho",
        resuelto: "Finalizado",
    };

    const exportar = () => handleExport(pedido, nombre_exportar, exportMapping);

    return (
        <>
            <GetData
                data={pedido}
                loading={loading}
                error={error}
                columns={columns}
                getRowId={(row) => row.id_pedido}
                openModal={openModal}
                selectedRow={selectedRow}
                openDialog={openDialog}
                dialogMessage={dialogParams ? getDialogMessage(dialogParams.currentValue) : ""}
                onCloseModal={() => setOpenModal(false)}
                onExport={exportar}
                onCloseDialog={handleCloseDialog}
                onConfirmAction={handleConfirmAction}
                ModalDetalleEntidad={ModalDetallePedido}
                orden='fecha_pedido'
            />

            <ModalConfirmDelete
                open={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setErrorModal(null);
                }}
                onConfirm={handleConfirmDelete}
                pedidoId={pedidoToDelete}
                isLoading={isDeleting}
            />
            <AppSnackbar ref={snackbarRef} />
        </>
    );
};

export default GetPedidos;