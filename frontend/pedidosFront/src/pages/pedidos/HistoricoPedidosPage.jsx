
import GetPedidos from "../../componentes/pedidos/GetPedidos";
import { useAuthGuard } from "../../hooks/useAuthGuard"



const HistoricoPedidosPage = () => {

  useAuthGuard();

  return (

      <GetPedidos estado={true} nombre_exportar={'Pedidos_historicos'}/>
  )
}

export default HistoricoPedidosPage