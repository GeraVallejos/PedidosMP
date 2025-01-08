import { useEffect, useState } from "react"
import api from "../helpers/interceptorJWT";

const GetProveedores = () => {


    const [proveedor, setProveedor] = useState([]);

    useEffect(() => {
        const fetchProveedor = async () => {
            const respuesta = await api.get("http://localhost:8000/api/v1/proveedor/");
            setProveedor(respuesta.data)

        }
        fetchProveedor();
    }, []);

    return (
        <>
            <div>
                {proveedor.map((proveedor) => {
                    return <li key={proveedor.id_producto}>{proveedor.nombre}</li>
                })}
            </div>
        </>
    )
}


export default GetProveedores