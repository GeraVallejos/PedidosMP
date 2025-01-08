import BotonCrear from "../../componentes/BotonCrear";
import GetPedidos from "../../componentes/GetPedidos";
import { useAuthGuard } from "../../hooks/useAuthGuard"


const PedidoPage = () => {

  useAuthGuard();

  const pedido = 'pedidos'

  return (
  
    <>
    <div><BotonCrear ruta={pedido} /></div>
    <div><GetPedidos /></div>
    </>
  )
}

export default PedidoPage