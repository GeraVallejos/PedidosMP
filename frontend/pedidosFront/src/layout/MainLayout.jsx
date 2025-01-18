
import { Box } from "@mui/material";
import NavBarComp from "../componentes/NavBarComp"
import SidebarComp from "../componentes/SideBarComp"


// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => {

    const drawerWidth = 240;

    return (


        <><Box sx={{
            display: 'flex',
            height: '100vh',
            overflow: 'hidden',
          }}>
            <NavBarComp drawerWidth={drawerWidth} />
            <SidebarComp drawerWidth={drawerWidth} />
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)`, xs:'100%' }, // Ajuste el contenido para que no se solape con el sidebar
                    height: '100vh', // Asegúrate de que el contenido ocupe toda la altura de la pantalla
                    overflow: 'auto', // Para manejar el contenido que exceda el espacio visible
                    marginTop: { xs: '56px', sm: '64px' } // Para que no se solape con el Navbar, que tiene una altura por defecto de 64px en MUI
                }}>
                {children}
            </Box>
        </Box>
        </>
    )
}


export default MainLayout