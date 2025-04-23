/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
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
    IconButton
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CloseIcon from '@mui/icons-material/Close';
import AppSnackbar from '../componentes/AppSnackbar';


const ModalConfirmDelete = ({
    open,
    onClose,
    onConfirm,
    pedidoId,
    isLoading = false,
}) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const snackbarRef = useRef();

    const handleSubmit = async () => {
        if (!password.trim()) {
            setError('Debe ingresar su contraseña');
            return;
        }

        try {
            const success = await onConfirm(pedidoId, password);
            if (success) {
                handleClose();
            }
        } catch (err) {
           
            console.error(err.message)
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
                        borderRadius: 2,
                        p: 0,
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                        backgroundColor: '#ffffff'
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        position: 'relative',
                        textAlign: 'center',
                        px: 4,
                        py: 3,
                        borderBottom: '1px solid #e0e0e0',
                        backgroundColor: '#f8f9fa'
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
                        <WarningAmberRoundedIcon 
                            sx={{ 
                                fontSize: 28,
                                color: '#ff9800' 
                            }} 
                        />
                    </Box>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 600,
                            color: '#42526e'
                        }}
                    >
                        Confirmar Eliminación
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        disabled={isLoading}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: '#42526e',
                            '&:hover': {
                                backgroundColor: '#ebecf0'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <input type="text" style={{ display: 'none' }} autoComplete="username" />

                    <DialogContent sx={{ pt: 3, px: 4, pb: 2 }}>
                        <Typography sx={{ mb: 1, color: '#42526e' }}>
                            Para eliminar este pedido, ingresa tu contraseña.
                        </Typography>
                        <Typography variant="body2" sx={{ 
                            mb: 2, 
                            color: '#ff4444',
                            fontWeight: 500
                        }}>
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
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#e0e0e0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#a7b6c2',
                                    },
                                }
                            }}
                        />
                    </DialogContent>

                    <DialogActions sx={{ 
                        justifyContent: 'space-between', 
                        px: 4, 
                        pb: 3, 
                        pt: 1,
                        borderTop: '1px solid #e0e0e0'
                    }}>
                        <Button
                            onClick={handleClose}
                            disabled={isLoading}
                            variant="outlined"
                            sx={{
                                color: '#42526e',
                                borderColor: '#e0e0e0',
                                '&:hover': {
                                    backgroundColor: '#ebecf0',
                                    borderColor: '#e0e0e0'
                                }
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="contained"
                            endIcon={isLoading && <CircularProgress size={20} />}
                            sx={{
                                backgroundColor: '#ff4444',
                                '&:hover': {
                                    backgroundColor: '#cc0000'
                                }
                            }}
                        >
                            {isLoading ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <AppSnackbar ref={snackbarRef} />
        </>
    );
};

export default ModalConfirmDelete;
