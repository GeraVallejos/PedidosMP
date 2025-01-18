
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from '@mui/material';

// eslint-disable-next-line react/prop-types
const AlertaConfirmacion = ({open, onClose, onConfirm, mensaje}) => {
   
    
    
      return (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {mensaje}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => { onConfirm(); onClose(); }} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      );
    };


export default AlertaConfirmacion