import { Outlet } from "react-router"
import { useState } from "react";
import Sidebar from "./componentes/sideBar";
import NavbarComponent from "./componentes/NavBar";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    // Maneja el colapso del sidebar en pantallas pequeñas
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="App">
      {/* Navbar */}
      <NavbarComponent />

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido Principal */}
      <div className={`content ${isOpen ? 'shifted' : ''}`}>
        <Outlet/>
      </div>
    </div>
    );
}

export default App
