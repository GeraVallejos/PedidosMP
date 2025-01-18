import { createBrowserRouter } from "react-router";
import UsuarioPage from "../pages/UsuarioPage";
import ProductosPages from "../pages/productos/ProductosPages";
import HomePage from "../pages/HomePage";
import App from "../App";
import ProveedorPage from "../pages//proveedores/ProveedorPage";
import LoginPage from "../pages/LoginPage";
import { privateLoader, publicLoader } from "./loader";
import PedidoPage from "../pages/pedidos/PedidoPage";
import CrearProductosPage from "../pages/productos/CrearProductosPage";
import CrearProveedorPage from "../pages/proveedores/CrearProveedorPage";
import CrearPedidosPage from "../pages/pedidos/CrearPedidosPage";
import HistoricoPedidosPage from "../pages/pedidos/HistoricoPedidosPage";


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
                path: "productos-crear",
                element: <CrearProductosPage />,
            },
            {
                path: "proveedor",
                element: <ProveedorPage />,
            },
            {
                path: "proveedor-crear",
                element: <CrearProveedorPage />,
            },
            {
                path: "pedidos",
                element: <PedidoPage />,
            },
            {
                path: "pedidos-crear",
                element: <CrearPedidosPage />,
            },
            {
                path: "pedidos-historico",
                element: <HistoricoPedidosPage />,
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