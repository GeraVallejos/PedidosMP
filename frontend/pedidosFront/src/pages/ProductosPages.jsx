import ProductosForm from "../forms/ProductosForm"
import { useAuthGuard } from "../hooks/useAuthGuard";


const ProductosPages = () => {
  useAuthGuard();
  return (
    <div><ProductosForm /></div>
  )
}

export default ProductosPages