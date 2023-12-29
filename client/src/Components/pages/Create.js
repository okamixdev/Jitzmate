import React, { useState } from 'react'
import { UPLOAD_FILE } from '../../Utils/mutations';
import { useMutation } from '@apollo/client';

export const Create = () => {


  const [image, setImage] = useState({});



  const inputChangeHandler = (e) => {
    e.preventDefault();

    console.log(e.target.files[0]);

  }


  return (

    <div className='create-container'>
      <h1>Create</h1>


      <form className='create-post-form'>
        <input type='text' placeholder='Caption'></input>
        <input className='files' type='file' onChange={inputChangeHandler}></input>
        <button type='submit'>Submit</button>
      </form>


    </div>

  )
}
