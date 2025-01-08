import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../auth/authSlice";
import { useNavigate } from "react-router";
import { Button, Grid2, TextField } from "@mui/material";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Despacha la acción de login
            const resultAction = await dispatch(login({ username, password })).unwrap();

            if (resultAction) {
                // Redirige al usuario a una página protegida
                navigate("/pedidos");
            }
        } catch (err) {
            console.error("Error durante el login:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <Grid2 container direction={'column'}>
                <Grid2 item xs={12} sx={{ mt: 2 }}>
                    <TextField
                        label="Usuario"
                        type="text"
                        placeholder='Nombre de Usuario'
                        fullWidth
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Grid2>

                <Grid2 item xs={12} sx={{ mt: 2 }}>
                    <TextField
                        label="Contraseña"
                        type="password"
                        placeholder='Contraseña'
                        fullWidth
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Grid2>
                <Grid2 container direction={'column'}>
                <Grid2 item xs={12} alignContent={"center"} sx={{ mt: 2 }}>
                    <Button variant='contained' type="submit" fullWidth disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </Button>
                </Grid2>
                </Grid2>
                {error && <p className="error-message">{error}</p>}
            </Grid2>
        </form>
    );
};

export default LoginForm;