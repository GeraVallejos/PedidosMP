import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';


const BotonLogout = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch(logout())
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error al cerrar sesión', error);
              
            });
    };

    return (
        <Button variant="primary" onClick={handleLogout}>Cerrar Sesión</Button>
    );
};

export default BotonLogout;