import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

// eslint-disable-next-line react/prop-types
const BotonCrear = ({ruta}) => {

    const navigate = useNavigate();

    const handleClick = () => navigate(`/${ruta}-crear`);

  return (
    <Button variant="primary" onClick={handleClick}>Crear {ruta}</Button>
  )
}

export default BotonCrear