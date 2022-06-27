import React from 'react'
import {useEffect, useState} from "react"
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import "./AlbumEdit.css"

const AlbumEdit = () => {
  const navigate=useNavigate()
  const {id:nameId} = useParams()
// console.log({id:nameId});
  const [name,setNames]=useState({name:"",description:"",images:"",tags:""})
  const [error,setError]=useState(false)
 //const num={id:nameId}
 //console.log(num);
  useEffect(()=>{
    const token=localStorage.getItem("accessToken")
    axios.get(`http://localhost:3001/albums/${nameId}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    }).then((response)=>{
        if(response.data.success){
          setNames(response.data.data.album)
        }
    }).catch((error)=>console.error(error))
  },[nameId])

  const handeiOnSubmit=(e)=>{
      e.preventDefault()
      if(name.name.trim().length ===0){
        setError(true)
        return
      }
      setError(false)
      const token=localStorage.getItem("accessToken")
      axios.put(`http://localhost:3001/albums/${nameId}`,name,{
        headers:{
          "conten-type":"application/json",
          authorization:`Bearer ${token}`
        }
      }).then((response)=>{
        if(response.data.success)
          navigate("/Album")
      })

  }
  const handelOnChande=(e)=>{
    setNames({...name,[e.target.name]: e.target.value})
  }
  return (
    <div className='bodyyy'>
    <div className='editbodys'>
        <div className="edit-container">
          <div className='edit-Title'>Update Album</div>
          <form className='edit-form' onSubmit={handeiOnSubmit}>
            <div className='edit-details'>
            <div className='edit-box'>
              <span className='ed-details'>Enter Name</span>
              <input 
                type="text"
                className='in-name'
                placeholder='Enter name'
                name='name'
                value={name.name}
                onChange={handelOnChande} />
            </div>
            <div className='edit-box'>
            <span className='ed-details'>Description</span>
              <input 
                type="text"
                className='in-description'
                placeholder='Enter description'
                name='description'
                value={name.description}
                onChange={handelOnChande} />
            </div>
            <div className='edit-box'>
            <span className='ed-details'>Enter image URL </span>
              <input 
                type="text"
                className='in-images'
                placeholder='Enter images'
                name='images'
                value={name.images}
                onChange={handelOnChande} />
            </div>
            <div className='edit-box'>
            <span className='ed-details'>Enter tags </span>
              <input 
                type="text"
                className='in-tags'
                placeholder='Enter tags'
                name='tags'
                value={name.tags}
                onChange={handelOnChande} />
            </div>
            </div>
            <div className='su-bt'>
              <button className='btt'>😍Submit😍</button>
            </div>
          </form>
          {error ? (
            <div className='edit-alert'>
                <p className='edit-msg'> Invalid</p>
            </div>
          ) : null }
        </div>
    </div>
    </div>
  )
}

export default AlbumEdit





