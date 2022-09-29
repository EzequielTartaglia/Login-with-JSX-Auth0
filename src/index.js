import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Extension to authentification
import {Auth0Provider} from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom';

/* ----------------- Settings end -------------------- */
const root = ReactDOM.createRoot(document.getElementById('root'));

/* Access to env - "Observar .env para cambiar en Auth0 dependiendo el proyecto" */ 
const dominio = process.env.REACT_APP_AUTH0_DOMAIN //Cambia depende el https://manage.auth0.com/
const idCliente = process.env.REACT_APP_AUTH0_CLIENT_ID //Cambia depende el https://manage.auth0.com/

root.render(
  <React.StrictMode>
   
   <BrowserRouter>

    {/* Autenthification */}
    <Auth0Provider
    domain={dominio}
    clientId={idCliente}
    redirectUri={window.location.origin}
  > {/* Redirecciona al lugar donde el cliente estaba (logea en el perfil y lo reenvia al perfil pero logueado) */}
      
      {/* App */}
      <App />
    
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
