import { Outlet } from "react-router"
import { useState } from "react";
import Sidebar from "./componentes/sideBar";
import NavbarComponent from "./componentes/NavBar";
import AppTheme from "./theme/AppTheme";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Maneja el colapso del sidebar en pantallas pequeñas
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <AppTheme>
      <div className="App">

        <NavbarComponent />


        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />


        <div className={`content ${isOpen ? 'shifted' : ''}`}>
          <Outlet />
        </div>
      </div>
    </AppTheme>
  );
}

export default App
