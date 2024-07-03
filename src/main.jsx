import React from 'react'
import ReactDOM from 'react-dom/client'
import Context from './Store/FirebaseContext.jsx'
import App from './App.jsx'
import './index.css'
import { app, auth, db } from './firebase/config.js'
import { FirebaseContext } from './Store/FirebaseContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <FirebaseContext.Provider value={{ app, db, auth }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>

  </React.StrictMode>,
)
