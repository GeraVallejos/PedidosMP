// components/AppSnackbar.jsx
import { Snackbar, Alert } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';

const AppSnackbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info'); // 'error', 'warning', 'info', 'success'

  useImperativeHandle(ref, () => ({
    show: (newMessage, newSeverity = 'info') => {
      setMessage(newMessage);
      setSeverity(newSeverity);
      setOpen(true);
    }
  }));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity}
        sx={{ width: '100%' }}
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
});

AppSnackbar.displayName = 'AppSnackbar';

export default AppSnackbar;