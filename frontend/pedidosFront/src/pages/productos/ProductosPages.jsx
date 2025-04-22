import BotonCrear from "../../componentes/BotonCrear";
import GetProductos from "../../componentes/productos/GetProductos";
import { useAuthGuard } from "../../hooks/useAuthGuard";


const ProductosPages = () => {
  useAuthGuard();
  const producto = 'productos'
  return (
    <>
    <div><BotonCrear ruta={producto}/></div>
    <div><GetProductos /></div>
    </>
  )
}

export default ProductosPages