import { useProveedorData } from "../../hooks/useProveedorData";
import { useTablaOperaciones } from "../../hooks/useTablaOperaciones";
import ModalDetallePedido from "../../modals/ModalDetallePedido";
import GetData from "../GetData";
import ColumnaProveedores from "./ColumnaProveedores";


const GetProductos = () => {
    const { proveedor, loading, error, updateProveedor, deleteProveedor, setProveedor } = useProveedorData();

    const {
        selectedRow,
        openModal,
        openDialog,
        dialogParams,
        setOpenModal,
        handleOpenDialog,
        handleCloseDialog,
        handleEdit,
        handleExport
    } = useTablaOperaciones();

    // Lógica personalizada para actualizar un pedido (confirmar estado)
    const handleConfirmAction = async () => {
        if (!dialogParams) return;

        const { id, currentValue, rowData } = dialogParams;
        const success = await updateProveedor(id, {
            ...rowData,
            resuelto: !currentValue,
        });

        if (success) {
            setProveedor(prev => prev.map(p => p.id_pedido === id ? { ...p, resuelto: !currentValue } : p));
        }

        handleCloseDialog();
    };

    const columns = ColumnaProveedores({
        onStatusChange: handleOpenDialog,
        onEdit: handleEdit,
        onDelete: (id) => deleteProveedor(id),
    });



    const exportMapping = {
        nombre: "Nombre",
        rut: "Rut",
        direccion: "Direccion",
        comuna: "Comuna",
        contacto: "Contacto",
        telefono: "Telefono",
        descripcion: "Descripcion",
        giro: "Giro",
        fecha_creacion: "Fecha Creacion",
        fecha_modificacion: "Fecha Modificacion",
    };

    const exportar = () => handleExport(proveedor, "Proveedores", exportMapping);

    return (
        <GetData
            data={proveedor}
            loading={loading}
            error={error}
            columns={columns}
            getRowId={(row) => row.id_proveedor}
            openModal={openModal}
            selectedRow={selectedRow}
            openDialog={openDialog}
            dialogMessage="Esta acción dará por terminado este pedido"
            onCloseModal={() => setOpenModal(false)}
            onExport={exportar}
            onCloseDialog={handleCloseDialog}
            onConfirmAction={handleConfirmAction}
            ModalDetalleEntidad={ModalDetallePedido}
            orden = 'nombre'
        />
    );
};

export default GetProductos;