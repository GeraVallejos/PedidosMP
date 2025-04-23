
import GetProductos from "../../componentes/productos/GetProductos";
import { useAuthGuard } from "../../hooks/useAuthGuard";


const ProductosPages = () => {
  useAuthGuard();

  return (
    <>
    <div><GetProductos /></div>
    </>
  )
}

export default ProductosPages