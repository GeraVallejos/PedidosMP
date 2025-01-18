import BotonCrear from "../../componentes/BotonCrear";
import GetPedidos from "../../componentes/pedidos/GetPedidos";
import { useAuthGuard } from "../../hooks/useAuthGuard"



const PedidoPage = () => {

  useAuthGuard();

  const pedido = 'pedidos'

  return (

    <>
      <BotonCrear ruta={pedido} />
      <GetPedidos />
    </>
  )
}

export default PedidoPage