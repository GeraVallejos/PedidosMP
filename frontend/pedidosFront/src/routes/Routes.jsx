import { createBrowserRouter } from "react-router";
import UsuarioPage from "../pages/UsuarioPage";
import ProductosPages from "../pages/ProductosPages";
import HomePage from "../pages/HomePage";
import App from "../App";
import ProveedorPage from "../pages/ProveedorPage";
import LoginPage from "../pages/LoginPage";
import { privateLoader, publicLoader } from "./loader";
import PedidoPage from "../pages/PedidoPage";


export const getRoutes = () => createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: privateLoader,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "usuario",
                element: <UsuarioPage />,
            },
            {
                path: "productos",
                element: <ProductosPages />,
            },
            {
                path: "proveedor",
                element: <ProveedorPage />,
            },
            {
                path: "pedidos",
                element: <PedidoPage />,
            },

        ]
    },
    {
        path: "login",
        loader: publicLoader,
        element: <LoginPage />,
    },
    {
        path: "*",
        loader: publicLoader,
        element: <LoginPage />,
    },
])