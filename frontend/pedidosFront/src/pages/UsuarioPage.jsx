import RegistroForm from "../forms/RegistroForm"
import { useAuthGuard } from "../hooks/useAuthGuard";


const UsuarioPage = () => {
  useAuthGuard();
  return (
    <div><RegistroForm /></div>
  )
}

export default UsuarioPage