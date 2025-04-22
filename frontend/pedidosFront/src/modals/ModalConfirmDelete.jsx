/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Box,
    Snackbar,
    Alert,
    IconButton
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CloseIcon from '@mui/icons-material/Close';

const ModalConfirmDelete = ({
    open,
    onClose,
    onConfirm,
    pedidoId,
    isLoading = false,
    onShowNotification
}) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [localNotification, setLocalNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const showNotification = (message, severity = 'success') => {
        setLocalNotification({
            open: true,
            message,
            severity
        });
    };

    const handleCloseNotification = () => {
        setLocalNotification(prev => ({ ...prev, open: false }));
    };

    const handleSubmit = async () => {
        if (!password.trim()) {
            setError('Debe ingresar su contraseña');
            return;
        }

        try {
            const success = await onConfirm(pedidoId, password);
            if (success) {
                showNotification('Pedido eliminado correctamente');

                if (onShowNotification) {
                    onShowNotification('Pedido eliminado correctamente', 'success');
                }

                handleClose();
            }
        } catch (err) {
            showNotification('Error al eliminar el pedido', 'error');
            if (onShowNotification) {
                onShowNotification('Error al eliminar el pedido', 'error');
            }
        }
    };

    const handleClose = () => {
        setPassword('');
        setError(null);
        onClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={!isLoading ? handleClose : null}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 0
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        position: 'relative',
                        textAlign: 'center',
                        px: 4,
                        py: 3,
                        borderBottom: '1px solid #eee',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                    >
                        <WarningAmberRoundedIcon color="warning" sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Confirmar Eliminación
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        disabled={isLoading}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <input
                        type="text"
                        style={{ display: 'none' }}
                        autoComplete="username"
                        aria-hidden="true"
                    />

                    <DialogContent sx={{ pt: 3, px: 4 }}>
                        <Typography sx={{ mb: 1 }}>
                            Para eliminar este pedido, ingresa tu contraseña para verificar tu identidad.
                        </Typography>
                        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                            Esta acción no se puede deshacer.
                        </Typography>

                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(null);
                            }}
                            error={!!error}
                            helperText={error}
                            disabled={isLoading}
                            autoComplete="current-password"
                        />
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: 'space-between', px: 4, pb: 3, pt: 1 }}>
                        <Button
                            onClick={handleClose}
                            disabled={isLoading}
                            variant="outlined"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            color="error"
                            variant="contained"
                            endIcon={isLoading && <CircularProgress size={20} />}
                        >
                            {isLoading ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {!onShowNotification && (
                <Snackbar
                    open={localNotification.open}
                    autoHideDuration={3500}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseNotification}
                        severity={localNotification.severity}
                        sx={{ width: '100%' }}
                    >
                        {localNotification.message}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
};

export default ModalConfirmDelete;
