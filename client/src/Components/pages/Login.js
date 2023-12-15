import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../Utils/mutations'
import Auth from '../../Utils/auth'

export const Login = () => {

  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN_USER);


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






  return (
    <>
      <h1>Login</h1>
      <form className='login' onSubmit={handleFormSubmit}>
        <input type='text' placeholder='email or username' name="email" value={userFormData.email} onChange={handleInputChange} />
        <input type='password' name="password" placeholder='password' value={userFormData.password} onChange={handleInputChange} />
        <input type='submit' placeholder='login' />
      </form>

    </>


  )
}
