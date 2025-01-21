
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
import { Link } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FnLogout from '../helpers/fnLogout';
import { useState } from 'react';
import { useSelector } from 'react-redux';



// eslint-disable-next-line react/prop-types
const NavBarComp = ({ drawerWidth }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { user } = useSelector((state) => state.auth);


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

  console.log(user)

  return (
    <AppBar position='fixed' sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` }
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <Link href='/productos' underline='none'>
                <Button onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'primary', display: 'block' }}>
                  PRODUCTOS
                </Button>
              </Link>
              <Link href='/proveedor' underline='none'>
                <Button onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'primary', display: 'block' }}>
                  PROVEEDORES
                </Button>
              </Link>
              <Link href='/pedidos-historico' underline='none'>
                <Button onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'primary', display: 'block' }}>
                  HISTÓRICO
                </Button>
              </Link>
            </Menu>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link href='/productos' underline='none'>
              <Button onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight:'bold' }}>
                PRODUCTOS
              </Button>
            </Link>
            <Link href='/proveedor' underline='none'>
              <Button onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight:'bold' }}>
                PROVEEDORES
              </Button>
            </Link>
            <Link href='/pedidos-historico' underline='none'>
              <Button onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight:'bold' }}>
                HISTÓRICO
              </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user && user.nombre ? (
                <Avatar>{user.nombre.slice(0,1) + user.apellido.slice(0,1)}</Avatar>)
                : (
                  // Fallback en caso de que 'user' no esté disponible
                  <Avatar></Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '60px' }}
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
            >
              <MenuItem>
                <Link href='/usuario' underline='none'>
                  <Typography sx={{ textAlign: 'center' }}>Usuarios</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={FnLogout()} sx={{display: 'flex'}}>
                  <ExitToAppIcon sx={{mr: '2px'}}/>
                  <Typography >Salir</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBarComp;