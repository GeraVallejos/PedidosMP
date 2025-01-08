import BotonCrear from "../../componentes/BotonCrear";
import GetProveedores from "../../componentes/GetProveedores";
import { useAuthGuard } from "../../hooks/useAuthGuard";



const ProveedorPage = () => {
  useAuthGuard();
  const proveedor = 'proveedor'
  return (
    <>
    <div><BotonCrear ruta={proveedor}/></div>
    <div><GetProveedores /></div>
    
    </>
  )
}

export default ProveedorPage