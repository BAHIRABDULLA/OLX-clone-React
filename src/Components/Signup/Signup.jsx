import React, { useContext, useState } from 'react';
import { auth } from '../../firebase/config';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {

  const [username, setUsername] = useState('')
  const [ email , setEmail ]= useState('')
  const [phone, setPhone ] = useState('')
  const [password,setPassword ]  =  useState('')
  const {app} = useContext(FirebaseContext)

  const handleSubmit =async (e)=>{
    e.preventDefault()
    console.log(username,'username');
    console.log(app,'app');
    await createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        console.log(userCredential.user,'userCredential.user');
      })
   
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input className="input" onChange={(e)=>setUsername(e.target.value)} type="text" id="fname" name="name" />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input className="input" onChange={(e)=>setEmail(e.target.value)} type="email" id="fname" name="email" />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input className="input" onChange={(e)=>setPhone(e.target.value)} type="number" id="lname" name="phone"  />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input className="input" onChange={(e)=>setPassword(e.target.value)} type="password" id="lname" name="password"  />
          <br />
          <br />
          <button  type='submit'>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
