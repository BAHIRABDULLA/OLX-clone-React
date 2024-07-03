import React, { useState ,useContext} from 'react';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail]= useState('')
  const [password,setPassword] = useState('')
  const {auth}  = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(email,'email');
    try {
      const userCredential =await signInWithEmailAndPassword(auth,email,password)
      const user = userCredential.user
      navigate('/')
      console.log(user,'user in login ');

    } catch (error) {
      alert('Error founding on login ',error.message);
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form  onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input className="input" onChange={(e)=>setEmail(e.target.value)} type="email" id="fname" name="email" />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input className="input" onChange={(e)=>setPassword(e.target.value)} type="password" id="lname" name="password"  />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
