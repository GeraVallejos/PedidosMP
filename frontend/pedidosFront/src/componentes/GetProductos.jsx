import { useEffect, useState } from "react"
import api from "../helpers/interceptorJWT";


const GetProductos = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
        const respuesta = await api.get("http://localhost:8000/api/v1/producto/");
        setProductos(respuesta.data)
        
        }
        fetchProductos();
      }, []);
      
  return (
    <>
        <div>
            {productos.map((producto) => {
               return <li key={producto.id_producto}>{producto.nombre}</li>
            })}
        </div>
    </>
  )
}

export default GetProductos