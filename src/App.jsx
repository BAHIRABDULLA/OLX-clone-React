import React, { useEffect, useContext } from 'react'

import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CreatePage from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthContext, FirebaseContext } from './Store/FirebaseContext'
import { onAuthStateChanged } from 'firebase/auth'


const App = () => {
  const { user, setUser } = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    console.log(user, 'user in home page');
  }, [])
  return (

    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreatePage/> } />
          <Route path='/view'  element={<ViewPost/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App