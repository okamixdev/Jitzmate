import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_POST } from '../../Utils/mutations';
import axios from 'axios'
import Auth from '../../Utils/auth';

export const Create = () => {


  const [file, setFile] = useState({});
  const [caption, setCaption] = useState("");
  const [postFormData, setPostFormData] = useState({ texto: "", files: "" });
  const [create] = useMutation(ADD_POST);




  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await create({
        variables: { ...postFormData }
      })

      const formData = new FormData()
      formData.append('file', file)

      const headers = {
        'Authorization': `${Auth.getToken()}`,
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*"
      }

      const result = await axios.post(`/api/post/upload/${data.addPost._id}`, formData, { headers: headers })
        .then(response => { console.log(response) })
        .catch(error => console.log(error))

    } catch (err) {
      console.log(err)
    }
  }


  return (

    <div className='create-container'>
      <h1>New Post</h1>

      <div className='create-post-form' >
        <form onSubmit={handleFormSubmit}>
          <input className='text-in-create' type='text' placeholder='Caption' onChange={e => {
            setCaption(e.target.value)
          }}></input>
          <input className='files' type='file' accept='image/*' onChange={e => {
            setFile(e.target.files[0])
          }}></input>
          <label for="file"><i class="fa-solid fa-image"></i>Upload</label>
          <button type='submit' onClick={() => { setPostFormData({ texto: caption, files: file.name }) }}>Submit</button>
        </form>
      </div>


    </div >

  )
}
