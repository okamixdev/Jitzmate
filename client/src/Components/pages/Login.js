import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../Utils/mutations'
import Auth from '../../Utils/auth'

export const Login = () => {

  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN_USER);

  const [userRegisterData, setUserRegisterData] = useState({
    email: "", password: "",
    first: "", last: "", username: ""
  });


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      Auth.login(data.login.token);
      console.log(userFormData)

    } catch (err) {
      console.log(err)
    }

    // setUserFormData({
    //   email: "",
    //   password: ""
    // })



  };
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleRegisterBtn = async (e) => {
    const target = e.target.parentElement.parentElement.parentElement.parentElement;
    target.classList.add('active');
  };

  const handleLoginBtn = async (e) => {
    const target = e.target.parentElement.parentElement.parentElement.parentElement;
    target.classList.remove('active');
  };






  return (
    <>
      <div className='container'>
        <div className='form-container sign-up'>
          <form className='signup' onSubmit={handleFormSubmit}>
            <h1>Create Account</h1>
            <input type='text' placeholder='First Name' name="first" value={userFormData.email} onChange={handleInputChange} />
            <input type='text' name="last" placeholder='Last Name' value={userFormData.password} onChange={handleInputChange} />
            <input type='text' placeholder='Username' name="username" value={userFormData.email} onChange={handleInputChange} />
            <input type='text' name="email" placeholder='Email' value={userFormData.password} onChange={handleInputChange} />
            <input type='password' name="password" placeholder='Password' value={userFormData.password} onChange={handleInputChange} />
            <button type='submit' placeholder='login' >Sign Up</button>
          </form>
        </div>

        <div className='form-container sign-in'>
          <form className='login' onSubmit={handleFormSubmit}>
            <h1>Sign In</h1>
            <input type='text' placeholder='Email or Username' name="email" value={userFormData.email} onChange={handleInputChange} />
            <input type='password' name="password" placeholder='Password' value={userFormData.password} onChange={handleInputChange} />
            <button type='submit' placeholder='login' >Sign In</button>
          </form>
        </div>

        <div className='toggle-container'>
          <div className='toggle'>
            <div className='toggle-panel toggle-left'>
              <h1>Welcome Back!</h1>
              <p>Login to use the app features</p>
              <button className='hidden' onClick={handleLoginBtn}>Sign In!</button>
            </div>
            <div className='toggle-panel toggle-right'>
              <h1>Hello Jitz!</h1>
              <p>Register to use the app features</p>
              <button className='hidden' onClick={handleRegisterBtn} >Sign Up!</button>
            </div>
          </div>
        </div>

      </div>

    </>


  )
}
