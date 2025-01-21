import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, login } from "../auth/authSlice";
import { useNavigate } from "react-router";
import { Alert, Button, Grid2, TextField } from "@mui/material";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const { loading, error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Despacha la acción de login
            const resultAction = await dispatch(login({ username, password })).unwrap();
            dispatch(fetchUser())

            if (resultAction) {
                // Redirige al usuario a una página protegida
                navigate("/pedidos");
            }
        } catch (err) {
            console.error("Error durante el login:", err);
        }
    };

    useEffect(() => {
   
        if (error!=null){
            setTimeout(()=>{
                navigate(0);
                usernameRef.current.focus();
            },2000)
      }
    }, [navigate, error])

    useEffect(() => {
        if(error===null){
            usernameRef.current.focus();
        }
    },[error])
    

    return (
        <form onSubmit={handleSubmit} >
            <Grid2 container direction={'column'}>
                <Grid2 xs={12} sx={{ mt: 2 }}>
                    <TextField
                        label="Usuario"
                        type="text"
                        placeholder='Nombre de Usuario'
                        fullWidth
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        inputRef={usernameRef}
                    />
                </Grid2>

                <Grid2 xs={12} sx={{ mt: 2 }}>
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
                    <Grid2 xs={12} alignContent={"center"} sx={{ mt: 2 }}>
                        <Button variant='contained' type="submit" fullWidth disabled={loading}>
                            {loading ? "Ingresando..." : "Iniciar Sesión"}
                        </Button>
                    </Grid2>
                </Grid2>
                                
                    {error && 
                    <Alert variant="outlined" severity="error" sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>{error}</Alert>}
                

            </Grid2>
        </form>
    );
};

export default LoginForm;