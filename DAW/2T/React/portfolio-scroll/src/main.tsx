import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Componente App proviene de la exportacion del App.tsx 
        todo el HTML que devuelve el <App></App> se sustitituye 
        en el etiqueta <App /> 
    */}
    <App /> 
  </StrictMode>,
)
