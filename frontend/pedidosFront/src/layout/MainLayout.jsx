
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
                    width: { sm: `calc(100% - ${drawerWidth}px)`, xs:'100%' }, 
                    height: '100vh',
                    overflow: 'auto', 
                    marginTop: { xs: '56px', sm: '64px' }
                }}>
                {children}
            </Box>
        </Box>
        </>
    )
}


export default MainLayout