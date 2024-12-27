import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../auth/authSlice";
import { useNavigate } from "react-router";

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
                navigate("/productos");
            }
        } catch (err) {
            console.error("Error durante el login:", err);
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={username}
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn-login"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LoginForm;