import { Outlet } from "react-router"
import AppTheme from "./theme/AppTheme";
import MainLayout from "./layout/MainLayout";


function App() {

  return (
    <AppTheme>
      <MainLayout>
        <Outlet />
        </MainLayout>
    </AppTheme>
  );
}

export default App
