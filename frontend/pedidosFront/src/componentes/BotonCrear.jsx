
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';

// eslint-disable-next-line react/prop-types
const BotonCrear = ({ruta}) => {

    const navigate = useNavigate();

    const handleClick = () => navigate(`/${ruta}-crear`);

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <Button variant="contained"
        color="secondary"
        size="large"
        //endIcon={<ArrowForwardIosIcon />}
        sx={{
          borderRadius: '5px', // Botón redondeado
          padding: '10px 20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Sombra moderna
          '&:hover': {
            backgroundColor: '#056900', // Azul más oscuro al pasar el cursor
          },
          mb:2,
          width: 500,
          fontWeight: 'bold'
          
        }}
       onClick={handleClick}>Crear {ruta}</Button>
    </Box>
  )
}

export default BotonCrear