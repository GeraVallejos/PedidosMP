import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Link, Typography } from '@mui/material';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';


// eslint-disable-next-line react/prop-types
const SideBarComp = ({ drawerWidth }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen); // Cambiar el estado del Drawer
  };

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center',  }}>
  <Link href='/' underline='none' style={{ display: 'flex', justifyContent: 'center', height:'68px', mt: '20px' }}>
 
    <Typography fontSize={20} sx={{mt:'21px'}}>JJ DETERGENTES</Typography>
  
  </Link>
</Toolbar>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <Link href='/pedidos'>
            <ListItemIcon>
            <ListAltOutlinedIcon />
              <ListItemText primary={'Pedidos'}/>
            </ListItemIcon>
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <Link href='/facturas'>
            <ListItemIcon>
            <ListAltOutlinedIcon />
              <ListItemText primary={'Facturas'}/>
            </ListItemIcon>
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      
      
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}  // Cambia el estado del Drawer
            sx={{ ml: 0.5, display: { xs: 'block', sm: 'none' } }}  // Solo visible en pantallas pequeñas
          >
            <WidgetsOutlinedIcon />
            
          </IconButton>      

      {/* El Drawer para pantallas pequeñas */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}  // Al hacer click fuera del Drawer también se cierra
          ModalProps={{
            keepMounted: true, // Mejor rendimiento al abrir/cerrar en móviles
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* El Drawer para pantallas grandes */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* El contenido principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
      </Box>
    </Box>
  
  );
}

export default SideBarComp;