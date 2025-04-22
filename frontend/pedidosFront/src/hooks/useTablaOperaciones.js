import { useState } from 'react';
import * as XLSX from 'xlsx';

export const useTablaOperaciones = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogParams, setDialogParams] = useState(null);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [passwordDialogParams, setPasswordDialogParams] = useState(null);

    const handleOpenDialog = (id, currentValue, rowData) => {
        setDialogParams({ id, currentValue, rowData });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => setOpenDialog(false);

    const handleEdit = (row) => {
        setSelectedRow(row);
        setOpenModal(true);
    };

    const handleOpenPasswordDialog = (params) => {
        setPasswordDialogParams(params);
        setOpenPasswordDialog(true);
    };

    const handleClosePasswordDialog = () => {
        setOpenPasswordDialog(false);
        setPasswordDialogParams(null);
    };
    
    const handleExport = (data, fileNamePrefix, columnsMapping) => {
        if (!data || data.length === 0) {
            console.warn('No hay datos para exportar');
            return;
        }
        
        const formattedData = data.map(row => {
            const formattedRow = {};
            Object.keys(columnsMapping).forEach(key => {
                // Manejo seguro de valores undefined/null
                formattedRow[columnsMapping[key]] = row[key] ?? '';
                
                // Transformación para valores booleanos
                if (typeof row[key] === 'boolean') {
                    formattedRow[columnsMapping[key]] = row[key] ? 'Sí' : 'No';
                }
            });
            return formattedRow;
        });

        try {
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
            XLSX.writeFile(workbook, `${fileNamePrefix}_${new Date().toISOString().slice(0, 10)}.xlsx`);
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
        }
    };

    return {
        selectedRow,
        openModal,
        openDialog,
        dialogParams,
        openPasswordDialog,
        passwordDialogParams,
        setOpenModal,
        handleOpenDialog,
        handleCloseDialog,
        handleEdit,
        handleExport,
        handleOpenPasswordDialog,
        handleClosePasswordDialog
    };
};