import { useEffect } from "react";
import api from "../helpers/interceptorJWT";

const FetchPedido = (setPedido, setLoading, setError, estado) => {
useEffect(() => {
    const fetchPedidos = async () => {
        try {
            const respuesta = await api.get("http://localhost:8000/api/v1/pedido/");
            //Solo se muestran los no resueltos en esta pagina
            const dataFilter = respuesta.data.filter(res => res.resuelto === estado)
            setPedido(dataFilter);
            setLoading(false)
        } catch (error) {
            setError('Error al cargar los datos');
            setLoading(false)
        }
    }
    fetchPedidos();
}, [setPedido, setLoading, setError, estado]);
}

export default FetchPedido;