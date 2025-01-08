import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router"
import { Provider } from 'react-redux';
import store from './store';
import './styles.css'
import { getRoutes } from './routes/Routes';



const router = getRoutes();

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
  
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

  </React.StrictMode>,
)
