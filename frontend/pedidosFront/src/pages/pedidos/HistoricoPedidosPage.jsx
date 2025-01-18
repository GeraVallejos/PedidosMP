
import HistoricoPedidos from "../../componentes/pedidos/HistoricoPedidos";
import { useAuthGuard } from "../../hooks/useAuthGuard"



const HistoricoPedidosPage = () => {

  useAuthGuard();

  return (

    <>
      <HistoricoPedidos />
    </>
  )
}

export default HistoricoPedidosPage