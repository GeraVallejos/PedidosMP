import { useEffect, useState } from "react"
import api from "../helpers/interceptorJWT";


const GetPedidos = () => {

    const [pedido, setPedido] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            const respuesta = await api.get("http://localhost:8000/api/v1/pedido/");
            setPedido(respuesta.data);
        }
        fetchPedidos();
    }, [])


    return (
        <>
            <div>{pedido.map((pedido) => {
                return <li key={pedido.id_pedido}>{pedido.pedidos_producto}</li>
            })}
            </div>
        </>
    )

}

export default GetPedidos