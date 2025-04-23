import GetProveedores from "../../componentes/proveedores/GetProveedores";
import { useAuthGuard } from "../../hooks/useAuthGuard";



const ProveedorPage = () => {
  useAuthGuard();

  return (
    <>

    <div><GetProveedores /></div>
    
    </>
  )
}

export default ProveedorPage