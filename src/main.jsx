import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';
import { Store } from './Store/Store.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={Store} >
  <BrowserRouter>
   <App/>
   <ToastContainer/>
  </BrowserRouter>
  </Provider>
)
