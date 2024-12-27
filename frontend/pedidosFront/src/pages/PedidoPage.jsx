import PedidosForm from "../forms/PedidosForm"
import { useAuthGuard } from "../hooks/useAuthGuard"


const PedidoPage = () => {
  useAuthGuard();
  return (
    <><PedidosForm /></>
  )
}

export default PedidoPage