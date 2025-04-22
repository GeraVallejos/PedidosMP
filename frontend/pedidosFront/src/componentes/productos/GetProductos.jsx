import { useProductosData } from "../../hooks/useProductosData";
import { useProveedorData } from "../../hooks/useProveedorData";
import { useTablaOperaciones } from "../../hooks/useTablaOperaciones";
import ModalDetallePedido from "../../modals/ModalDetallePedido";
import GetData from "../GetData";
import ColumnaProductos from "./ColumnaProductos";

const GetProductos = () => {
    const { producto, loading, error, updateProducto, deleteProducto, setProducto } = useProductosData();
    const {proveedor} = useProveedorData();
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
        const success = await updateProducto(id, {
            ...rowData,
            resuelto: !currentValue,
        });

        if (success) {
            setProducto(prev => prev.map(p => p.id_pedido === id ? { ...p, resuelto: !currentValue } : p));
        }

        handleCloseDialog();
    };

    const columns = ColumnaProductos({
        onStatusChange: handleOpenDialog,
        onEdit: handleEdit,
        onDelete: (id) => deleteProducto(id),
    });

    // Se crea un mapa de proveedores para búsqueda rápida
    const proveedorMap = {};
    proveedor.forEach(prov => {
        proveedorMap[prov.id_proveedor] = prov.nombre;
    });

    // Añadir el nombre del proveedor a cada producto
    const productosConProveedor = producto.map(prod => ({
        ...prod,
    // se realiza la comparativa y se asigna el nombre del proveedor
        nombre_proveedor: proveedorMap[prod.id_proveedor] || 'Sin proveedor'
    }));

    const exportMapping = {
        codigo: "Codigo",
        nombre: "Nombre",
        unidad: "Unidad",
        cantidad_stock: "Stock",
        fecha_creacion: "Fecha creacion",
        fecha_modificacion: "Fecha modificacion",
        costo_compra: "Costo compra",
        costo_venta: "Costo venta",
        bodega: "Bodega",
        nombre_proveedor: 'Proveedor',
        descripcion: "Descripcion",
    };

    const exportar = () => handleExport(productosConProveedor, "Productos", exportMapping);

    return (
        <GetData
            data={producto}
            loading={loading}
            error={error}
            columns={columns}
            getRowId={(row) => row.id_producto}
            openModal={openModal}
            selectedRow={selectedRow}
            openDialog={openDialog}
            dialogMessage="Esta acción dará por terminado este pedido"
            onCloseModal={() => setOpenModal(false)}
            onExport={exportar}
            onCloseDialog={handleCloseDialog}
            onConfirmAction={handleConfirmAction}
            ModalDetalleEntidad={ModalDetallePedido}
            orden = 'codigo'
        />
    );
};

export default GetProductos;