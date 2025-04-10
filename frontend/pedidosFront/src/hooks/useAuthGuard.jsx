import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";

export const useAuthGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Verificación básica del token (solo estructura, no expiración)
    const isTokenValid = (token) => {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;
        return true;
      } catch (error) {
        return false;
      }
    };

    if (!isTokenValid(token)) {
      dispatch(logout());
      navigate('/login');
    }
  }, [token, dispatch, navigate]);
};