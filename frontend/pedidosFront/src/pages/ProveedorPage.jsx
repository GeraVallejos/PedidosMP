import ProveedorForm from "../forms/ProveedorForm"
import { useAuthGuard } from "../hooks/useAuthGuard";


const ProveedorPage = () => {
  useAuthGuard();
  return (
    <div><ProveedorForm /></div>
  )
}

export default ProveedorPage