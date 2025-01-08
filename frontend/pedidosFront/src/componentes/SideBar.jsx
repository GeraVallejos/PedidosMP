
import { FaBars } from 'react-icons/fa';
import BotonLogout from './BotonLogout';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="http://localhost:5173">Home</a></li>
          <li><a href="http://localhost:5173/productos">Productos</a></li>
          <li><a href="http://localhost:5173/usuario">Usuarios</a></li>
          <li><a href="http://localhost:5173/pedidos">Pedidos</a></li>
          <li><a href="http://localhost:5173/proveedor">Proveedores</a></li>
          <li><BotonLogout/></li>
        </ul>
      </div>

      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-controls="sidebar"
      >
        <FaBars />
      </button>
    </>
  );
};

export default Sidebar;