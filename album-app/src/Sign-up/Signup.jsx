import React from 'react'
import { useState } from 'react'
import "./Signup.css"
import axios from "axios"
import {useNavigate,NavLink} from "react-router-dom"
const Signup = () => {
  const [user,setUser]=useState({title:"",name:"",email:"",password:""})
  const [error,setError]=useState(false)
  const navigate=useNavigate()

  const handelOnChange=(e)=>{
    setUser({...user, [e.target.name]: e.target.value})
  }
  const handelOnSubmit=(e)=>{
    e.preventDefault()
    if(user.title.trim().length === 0 || user.name.trim().length ===0 || user.email.trim().length === 0 || user.password.trim().length === 0){
      setError(true)
      return "error"
    }
    setError(false)
    axios.post("http://127.0.0.1:3001/users",user,{
      header:{"Content-Type":"application/json"}
    })
    .then(response =>{
      if(response.data.success){
        setUser({name:"",email:"",password:""})
        navigate("/Signin")
      }
    })
    .catch(error =>{
      console.error(error.response);
      setError(true)
    })
  }
  
  

  return (
    <div className='body'>
    <div className='Signup-container'>
      <div className='titles'>Registration</div>
        <form className='Signup-form' onSubmit={handelOnSubmit}>
          <div className='user-details'>
        <div className="input-box">
           <span className='details'>Enter Title </span>
            <input 
              type="text"
              placeholder='Enter Your Title Mr/Ms/Miss'
              name='title'
              className='title form-title size'
              id='title'
              value={user.title}
              onChange={handelOnChange} />
          </div>
          <div className="input-box">
          <span className='details'>Enter Your Name</span>
            <input 
              type="text"
              placeholder='Enter Your Name'
              name='name'
              className='name form-name size'
              id='name'
              value={user.name}
              onChange={handelOnChange} />
          </div>
          <div className="input-box">
          <span className='details'>Enter Your Email</span>
            <input 
              type="email"
              placeholder='Enter Your Email📧📧'
              name='email'
              className='email form-email size'
              id='email'
              value={user.email}
              onChange={handelOnChange} />
          </div>
          <div className="input-box">
          <span className='details'>Enter Your Password</span>
            <input 
              type="password"
              placeholder='Enter Password🔑🔑'
              name='password'
              className='password form-password size'
              id='password'
              value={user.password}
              onChange={handelOnChange} />
          </div>
          </div>
          <div className='but'>
            <button className='form-bt'>
                Register😍
            </button>
          </div>
        </form>
        { error ? (
            <div className='alert-msg'>
              <p className='msg'>INVAILD DETAILS</p>
            </div>
        ) : null }
      <div className="Signup-footer">
          <p>Already an user <NavLink to={"/Signin"}>click here</NavLink></p>
      </div>
      
    </div>
    </div>
  )
}

export default Signup
