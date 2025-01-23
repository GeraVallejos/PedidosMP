
import GetPedidos from "../../componentes/pedidos/GetPedidos";
import { useAuthGuard } from "../../hooks/useAuthGuard"



const HistoricoPedidosPage = () => {

  useAuthGuard();

  return (

      <GetPedidos estado={true}/>
  )
}

export default HistoricoPedidosPage