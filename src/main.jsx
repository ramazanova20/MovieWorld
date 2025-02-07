import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DataContext from './context/AllDataContext.jsx'
import DataContextProvider from './context/AllDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DataContextProvider>
    <DataContext>
      <App />
    </DataContext>
    </DataContextProvider>
  </BrowserRouter>,
)
