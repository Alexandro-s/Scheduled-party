import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


// Router - Rotas 

import Home from "./router/Home.jsx";
import CreateParty from "./router/CreateParty.jsx"
import Party from './router/Party.jsx';
import PartyEdit from './router/PartyEdit.jsx'

// Router-Dom 

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
  
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/party/new",
        element: <CreateParty />
      },
      {
        path: "/party/:id",
        element: <Party />
      },
      {
        path: "/party/edit/:id",
        element: <PartyEdit />
      }
    ]
  }
])


// Adicionar as rotas 

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router ={router}  />
  </StrictMode>,
)
