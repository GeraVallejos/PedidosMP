import * as React from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Fab,
  Typography,
} from '@mui/material';

import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Logo_JJ from '../assets/Logo_JJ.png'
import { useLocation, Link as RouterLink } from 'react-router';

const menuItems = [
  { text: 'Pedidos', icon: <FactCheckIcon />, path: '/pedidos' },
  { text: 'Productos', icon: <Inventory2SharpIcon />, path: '/productos' },
  { text: 'Proveedores', icon: <HomeWorkIcon />, path: '/proveedores' },
  { text: 'Facturas', icon: <ReceiptLongIcon />, path: '/facturas' },
];

// eslint-disable-next-line react/prop-types
const SideBarComp = ({ drawerWidth }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%', // Asegura que ocupe toda la altura
      backgroundColor: '#f8f9fa', // Color que se extenderá
      borderRight: '1px solid #e0e0e0'
    }}>
      <Toolbar sx={{
        minHeight: '64px !important',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2
      }}>
       <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 1 // Espacio entre logo y texto
      }}>
        {/* Agrega la imagen del logo */}
        <img 
          src={Logo_JJ} 
          alt="Logo JJ Detergentes" 
          style={{ 
            height: '32px', // Ajusta según necesites
            width: 'auto',
            objectFit: 'contain'
          }} 
        />
        <Typography variant="h6" noWrap sx={{ 
          fontSize: '14px', 
          fontWeight: 'bold',
          color: '#172b4d'
        }}>
          JJ DETERGENTES
        </Typography>
      </Box>

        <IconButton
          onClick={handleDrawerToggle}
          size="small"
          sx={{
            color: '#42526e',
            display: { xs: 'inline-flex', sm: 'none' }
          }}
        >
          <ChevronRightOutlinedIcon fontSize="small" />
        </IconButton>
      </Toolbar>

      <List sx={{ flexGrow: 1, px: 1 }}>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname.startsWith(path);

          return (
            <ListItemButton
              key={text}
              component={RouterLink}
              to={path}
              sx={{
                borderRadius: '4px',
                padding: '8px 12px',
                minHeight: '36px',
                mb: 0.5,
                justifyContent: 'flex-start',
                backgroundColor: isActive ? '#e4f0f6' : 'transparent',
                color: isActive ? '#0079bf' : '#42526e',
                '&:hover': {
                  backgroundColor: isActive ? '#e4f0f6' : '#ebecf0',
                },
              }}
            >
              <ListItemIcon sx={{
                color: isActive ? '#0079bf' : '#42526e',
                minWidth: '36px',
                justifyContent: 'center'
              }}>
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400'
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      <Fab
        color="primary"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1200,
          display: { xs: 'flex', sm: 'none' },
          backgroundColor: '#fff',
          color: '#42526e',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
        size="small"
      >
        <ChevronRightOutlinedIcon />
      </Fab>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 }
        }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: 'none',
              height: '100vh', // Altura completa
              overflowY: 'auto'  // Scroll si es necesario
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      />
    </Box>
  );
};

export default SideBarComp;