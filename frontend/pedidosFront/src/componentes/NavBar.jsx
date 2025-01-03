import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <div className='brand-navbar'>
                <Navbar.Brand href="http://localhost:5173/"><img
                    src="public/logo_JJ.png"
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="JJ Logo"
                /></Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#">Inicio</Nav.Link>
                    <Nav.Link href="#">Servicios</Nav.Link>
                    <Nav.Link href="#">Acerca de</Nav.Link>
                    <Nav.Link href="#">Contacto</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;