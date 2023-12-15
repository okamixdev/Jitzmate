import React from 'react'
import Auth from '../../Utils/auth'

export const Profile = () => {
  const handleClick = (e) => {
    e.preventDefault();

    Auth.logout();
  }





  return (

    <>
      <h1>Profile</h1>

      <button onClick={handleClick}>LOGOUT</button>

    </>

  )
}
