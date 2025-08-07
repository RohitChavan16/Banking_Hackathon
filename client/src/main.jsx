import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from "./context/AppContext.jsx";
import { FormProvider } from "./context/FormContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppContextProvider>
      <FormProvider>
    <App />
    </FormProvider>
    </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
