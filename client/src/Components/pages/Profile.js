import React from 'react'
import Auth from '../../Utils/auth'
import { OUser } from './OUser';

export const Profile = () => {
  const handleClick = (e) => {
    e.preventDefault();

    Auth.logout();
  }



  console.log(Auth.getProfile().data?._id)

  return (

    <>
      <h1>Profile</h1>

      <OUser _id={Auth.getProfile().data?._id} />






      <button onClick={handleClick}>LOGOUT</button>

    </>

  )
}
