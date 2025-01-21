import {Grid2, Typography} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
// eslint-disable-next-line react/prop-types
const AuthLayout = ({children}) => {

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JJ DETERGENTES
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JJ DETERGENTES
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
    <Grid2 container spacing={ 0 } direction="column" alignItems="center" justifyContent="center" 
    sx={{padding: 4 }}>
        <Grid2 className='box-shadow' xs={ 3 } sx={{ 
            width: { sm: 450 },
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2 
        }}>
            { children }
        </Grid2>
    </Grid2>
    </>
  );
}


export default AuthLayout