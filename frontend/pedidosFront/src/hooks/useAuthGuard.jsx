import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";

export const useAuthGuard = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    //const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
    // Decodificar el token para verificar su expiración
    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload;
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return null;
        }
    };

    const payload = decodeToken(token);
    if (!payload) {
        // Si el token no es válido, forzar logout
        dispatch(logout());
        navigate("/login");
        return;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime) {
        // Si el token ha expirado, forzar logout
        dispatch(logout());
        navigate("/login");
    }
  }, [token, dispatch, navigate]);
};