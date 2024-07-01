import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import { app } from './firebase/config.js'
import { FirebaseContext } from './Store/FirebaseContext.js'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <FirebaseContext.Provider value={{app}}>
    <App />
    </FirebaseContext.Provider>
    
  </React.StrictMode>,
)
