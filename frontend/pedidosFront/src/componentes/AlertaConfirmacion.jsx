import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line react/prop-types
const AlertaConfirmacion = ({ open, onClose, onConfirm, mensaje }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 0,
        },
      }}
    >
      <DialogTitle
        sx={{
          position: 'relative',
          textAlign: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid #eee',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <WarningAmberRoundedIcon color="warning" sx={{ fontSize: 28 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Confirmar
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, px: 4 }}>
        <DialogContentText sx={{ mb: 2, mt: 2, textAlign: 'center', fontSize: 16 }}>
          {mensaje}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 4, pb: 3, pt: 1 }}>
        <Button onClick={onClose} variant="outlined" size="medium">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="error"
          variant="contained"
          size="medium"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertaConfirmacion;
