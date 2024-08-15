import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleSuccess, handleError } from '../utils'
const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''

  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setSignupInfo(copysignupInfo);

  }
  console.log('login info changed', signupInfo);
  const handleSignup = async(e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('all credentials required')
    }
    try {
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message,error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');



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

        <h1>Register</h1>
        <form action="" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
              name='name'
            placeholder='Enter Your Name ...'
            value={signupInfo.name}

              autoFocus
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
              name='email'
            placeholder='Enter Your Email ...'
            value={signupInfo.email}


            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
              name='password'
            placeholder='Enter Password ...'
            value={signupInfo.password}

            />
        </div>
        <button type='submit'>Signup</button>
        <span>
          Already have an account?
          <Link to="/login">Login</Link>
          <br />
          password must be of at least 4 characters
        </span>

      </form>
      <ToastContainer />

      </div>


  )
}

export default Signup
