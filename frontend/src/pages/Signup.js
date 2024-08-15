import React from 'react'

const Signup = () => {
  return (
    <div>
       <div className="container">
        <h1>Register</h1>
        <form action="">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text"
              name='name'
              placeholder='Enter Your Name ...'

              autoFocus
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email"
              name='email'
              placeholder='Enter Your Email ...'


            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password"
              name='password'
              placeholder='Enter Password ...'

            />
          </div>

        </form>
      </div>

    </div>
  )
}

export default Signup
