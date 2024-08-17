import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleSuccess, handleError } from '../utils'
const Signup = () => {
  const [loginInfo, setLoginInfo] = useState({

    email: '',
    password: ''

  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    const copysignupInfo = { ...loginInfo };
    copysignupInfo[name] = value;
    setLoginInfo(copysignupInfo);

  }
  console.log('login info changed', loginInfo);
  const handleLogin = async(e) => {
    e.preventDefault();
    const {  email, password } = loginInfo;
    if (!email || !password) {
      return handleError('all credentials required')
    }
    try {
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message,error,jwtToken,name } = result;
      if (success) {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);


        handleSuccess(message);
        setTimeout(() => {
          navigate('/home');



        },1000)
        // setSignupInfo({
        //   name: '',
        //   email: '',
        //   password: ''
        // });
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }

      console.log(result);

    } catch (err) {
      handleError('Failed to register')

    }


  }
  return (

    <div className="container">

        <h1>Login</h1>
        <form action="" onSubmit={handleLogin}>

          <div>
            <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
              name='email'
            placeholder='Enter Your Email ...'
            value={loginInfo.email}


            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
              name='password'
            placeholder='Enter Password ...'
            value={loginInfo.password}

            />
        </div>
        <button type='submit'>Login</button>
        <span>
          Don't have an account?
          <Link to="/signup">Signup</Link>
          <br />
          password must be of at least 4 characters


        </span>

      </form>
      <ToastContainer />

      </div>


  )
}

export default Signup
