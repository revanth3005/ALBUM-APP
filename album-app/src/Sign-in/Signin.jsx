import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import "./Signin.css"

const Signin = () => {
  const navigate=useNavigate()
  const [user,setUser]=useState({email:"",password:""})
  const [error,setError]=useState(false)

  const handelOnChange=(e)=>{
    setUser({...user,[e.target.name]: e.target.value})
  }
  const handelOnSubmit=(e)=>{
      e.preventDefault()
      if(user.email.trim().length === 0 || user.password.trim().length === 0){
        setError(true)
        return
      }
      setError(false)
      axios.post("http://127.0.0.1:3001/login",user,{

        header:{"content-type":"application/json"}
        
      })
      .then(response => {
        if(response.data.success){
            setUser({email:"",password:""})
            const token=response.data.data.token
            localStorage.setItem("accessToken",token)
            localStorage.setItem("user_details",JSON.stringify(response.data.data.user))
            navigate("/Album")
        }
      })
      .catch(error => {
        console.error(error.response);
        setError(true)
      })
  }
  return (
    <div className='bodyy'>
    <div className='Signin-container'>
      <div className='title'>Sign-In</div>
        <form className='Signin-form' onSubmit={handelOnSubmit}>
          <div className='user-detail'>
          <div className='input-boxs'>
            <span className='detail'>Enter Your Email</span>
            <input 
              type="email"
              placeholder='Enter Email📧📧'
              className='in-email'
              id="in-email"
              name='email'
              value={user.email}
              onChange={handelOnChange}
             />
          </div>
          <div className='input-boxs'>
          <span className='detail'>Enter Your Password</span>
            <input 
              type="password"
              placeholder='Enter Password🔑🔑'
              className='in-password'
              id="in-password"
              name='password'
              value={user.password}
              onChange={handelOnChange}
             />
          </div>
          </div>
          <div className='submit-bt'>
              <button className='bt-in'>
                😍Sign-in😍
              </button>
          </div>
        </form>
        {error ? (
          <div className='alerts-msg'>
            <p className='msg'>INVALID DETAILS</p>
          </div>
        ) : null }
      <div className="signin-footer">
      <div className="Signin-footer">
          <p>Create a user <NavLink to={"/Signup"}>click here</NavLink></p>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Signin
