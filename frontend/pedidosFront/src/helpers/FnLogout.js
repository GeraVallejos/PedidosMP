import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../auth/authSlice";


const FnLogout = () => {
   
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
    return handleLogout
}

export default FnLogout