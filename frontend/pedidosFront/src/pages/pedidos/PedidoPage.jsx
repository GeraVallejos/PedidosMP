import GetPedidos from "../../componentes/pedidos/GetPedidos";
import { useAuthGuard } from "../../hooks/useAuthGuard"



const PedidoPage = () => {

  useAuthGuard();


  return (

    <>
      <GetPedidos estado={false} nombre_exportar={'Pedidos'} />
    </>
  )
}

export default PedidoPage