import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FnLogout from '../helpers/fnLogout';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router';
import { Link } from '@mui/material';


// eslint-disable-next-line react/prop-types
const NavBarComp = ({ drawerWidth }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const sectionLinks = {
    pedidos: [
      { text: 'Solicitados', path: '/pedidos' },
      { text: 'Nuevo Pedido', path: '/pedidos/nuevo' },
      { text: 'En Proceso', path: '/pedidos/enProceso' },
      { text: 'Histórico', path: '/pedidos/historico' }
    ],
    facturas: [
      { text: 'Generar Factura', path: '/facturas/nueva' },
      { text: 'Histórico Facturas', path: '/facturas/historico' }
    ],
    productos: [
      { text: 'Lista Productos', path: '/productos' },
      { text: 'Crear Producto', path: '/productos/nuevo' }
    ],
    proveedores: [
      { text: 'Lista Proveedores', path: '/proveedores' },
      { text: 'Crear Proveedor', path: '/proveedores/nuevo' },
    ]
  };

  const getActiveSection = (pathname) => {
    if (pathname.startsWith('/pedidos')) return 'pedidos';
    if (pathname.startsWith('/facturas')) return 'facturas';
    if (pathname.startsWith('/productos')) return 'productos';
    if (pathname.startsWith('/proveedores')) return 'proveedores';
    return null;
  };

  const activeSection = getActiveSection(location.pathname);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  return (
    <AppBar 
      position="fixed" 
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: '#ffffff',
        color: '#42526e',
        boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '64px !important' }}>

          {/* Menú para móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              sx={{ color: '#42526e' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ 
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: '#f8f9fa'
                }
              }}
            >
              {activeSection && sectionLinks[activeSection].map((link) => (
                <MenuItem 
                  key={link.path} 
                  onClick={handleCloseNavMenu}
                  selected={location.pathname === link.path}
                >
                  <Link 
                    component={RouterLink} 
                    to={link.path} 
                    underline="none" 
                    sx={{ width: '100%' }}
                  >
                    <Typography
                      sx={{
                        color: location.pathname === link.path ? '#0079bf' : '#42526e',
                        fontWeight: location.pathname === link.path ? 600 : 400
                      }}
                    >
                      {link.text}
                    </Typography>
                  </Link>
                </MenuItem>
                ))}
            </Menu>
          </Box>

          {/* Menú para desktop */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' },
            ml: 3,
            gap: 1
          }}>
            {activeSection && sectionLinks[activeSection].map((link) => (
              <Link 
                key={link.path}
                component={RouterLink} 
                to={link.path} 
                underline="none"
              >
                <Button
                  sx={{ 
                    my: 2, 
                    color: location.pathname === link.path ? '#0079bf' : '#42526e', 
                    display: 'block',
                    fontWeight: location.pathname === link.path ? 600 : 500,
                    fontSize: '14px',
                    '&:hover': {
                      backgroundColor: '#ebecf0'
                    }
                  }}
                >
                  {link.text}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Área de usuario */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user && user.nombre ? (
                  <Avatar sx={{ 
                    backgroundColor: '#e4f0f6', 
                    color: '#0079bf',
                    fontWeight: 600
                  }}>
                    {user.nombre.slice(0,1) + user.apellido.slice(0,1)}
                  </Avatar>
                ) : (
                  <Avatar sx={{ 
                    backgroundColor: '#e4f0f6', 
                    color: '#0079bf'
                  }}/>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: {
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              }}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link component={RouterLink} to="/usuario" underline="none" sx={{ width: '100%' }}>
                  <Typography 
                    sx={{ 
                      textAlign: 'center',
                      color: '#42526e',
                      fontWeight: 500,
                      fontSize: '14px'
                    }}
                  >
                    Usuarios
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem 
                onClick={FnLogout()} 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: '#ebecf0'
                  }
                }}
              >
                <ExitToAppIcon sx={{ mr: 1, color: '#ff4444', fontSize: '20px' }}/>
                <Typography 
                  sx={{ 
                    color: '#ff4444',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  Salir
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBarComp;