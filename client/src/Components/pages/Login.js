import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../Utils/mutations'
import { ADD_USER } from '../../Utils/mutations'
import Auth from '../../Utils/auth'

export const Login = () => {

  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN_USER);

  const [userRegisterData, setUserRegisterData] = useState({
    email: "", password: "",
    first: "", last: "", username: ""
  });
  const [addUser] = useMutation(ADD_USER);


  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      Auth.login(data.login.token);

    } catch (err) {
      console.log(err)
    }

    setUserFormData({
      email: "",
      password: ""
    })
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userRegisterData }
      });

      Auth.login(data.addUser.token);

    } catch (err) {
      console.log(err)
    }

    setUserRegisterData({
      email: "", password: "",
      first: "", last: "", username: ""
    })
  };


  const handleInputLogChange = async (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleInputSignChange = async (e) => {
    const { name, value } = e.target;
    setUserRegisterData({ ...userRegisterData, [name]: value });
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
          <form className='signup' onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <input type='text' placeholder='First Name' name="first" value={userRegisterData.first} onChange={handleInputSignChange} />
            <input type='text' placeholder='Last Name' name="last" value={userRegisterData.last} onChange={handleInputSignChange} />
            <input type='text' placeholder='Username' name="username" value={userRegisterData.username} onChange={handleInputSignChange} />
            <input type='text' placeholder='Email' name="email" value={userRegisterData.email} onChange={handleInputSignChange} />
            <input type='password' placeholder='Password' name="password" value={userRegisterData.password} onChange={handleInputSignChange} />
            <button type='submit' placeholder='login' >Sign Up</button>
          </form>
        </div>

        <div className='form-container sign-in'>
          <form className='login' onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <input type='text' placeholder='Email or Username' name="email" value={userFormData.email} onChange={handleInputLogChange} />
            <input type='password' name="password" placeholder='Password' value={userFormData.password} onChange={handleInputLogChange} />
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
