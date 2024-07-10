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
      <OUser _id={Auth.getProfile().data?._id} />



      <button onClick={handleClick}>LOGOUT</button>

    </>

  )
}
