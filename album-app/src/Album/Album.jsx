import React from 'react'
import { useState,useRef,useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faTrash } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom'
import "./Album.css"


const Album = () => {
    const todoRef=useRef()
    // const [names,setNames]=useState("")
    const [names,setNames]=useState({name:"",description:"",images:"",tags:""})
    const [newNames,setNewNames]=useState([])//empty
    const [error,setError]=useState(false)
    
    const handelOnChange=(e)=>{
        setNames({...names,[e.target.name]: e.target.value })
        
    }
    // const handelNameDelete=()=>{
        
    // }
    const handelOnSubmit=(e)=>{
        e.preventDefault()
        if(names.name.trim().length === 0 || names.description.trim().length === 0 || names.images.trim().length === 0){
            setError(true)
            return
        }
        setError(false)
        const token=localStorage.getItem("accessToken")
        axios.post("http://127.0.0.1:3001/album-name",names,
        {
            headers:{
                "content-type":"application/json",
                authorization:`Bearer ${token}`
            }
        }).then(
            (response)=>{
                if(response.data.success){
                    const name=response.data.data.albumName
                   // console.log(name._id);
                    setNewNames([...newNames,name])
                }
            }
        ).catch(error =>{
            console.error(error.response);
            setError(true)
        })
        setNames({name:"",description:"",images:"",tags:""})//-----------
    }

    const handelNameDelete=(id)=>{
       const token=localStorage.getItem("accessToken")
       console.log(token);
       axios.delete(`http://localhost:3001/albums/${id}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
       }).then((response)=>{
        if(response.data.success){
            console.log(response.data.success);
            const filters=newNames.filter(({_id})=> _id !== id )
            setNewNames(filters)
        }
       })
    }
    //useEffect
    useEffect(()=>{
        const token=localStorage.getItem("accessToken")
        axios
        .get("http://localhost:3001/albums", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const names = response.data.data.albums;
          //console.log(response.data);
         // console.log(books);
         //console.log(names);
          setNewNames(names);
        })
        .catch((error) => {
          console.error(error);
        })
    },[])
  return (
    <div className='Album'>
        <div className="Album-body">
          <ul>
            {
                newNames.map((n)=>{
                    // console.log(n._id);
                    return(
                        <div className='form-list' key={n._id}>
                            <li >
                                <div className='flex'>
                           <div className='input-name ssd' >
                                 <strong>Album name--</strong>{n.name } <br />
                                <strong> Image url--- </strong>{n.images}  <br />
                                <strong> Description-- </strong>{n.description}  <br />
                                 <strong>tags --------</strong>  {n.tags}

                            </div> 
                            <div className='Albumedit-link'>
                            <Link to={"/albums/"+n._id}>
                                <FontAwesomeIcon icon={faPen} className="edit-bt"/>
                            </Link>
                            <button onClick={()=>handelNameDelete(n._id)} className="delete-bt">
                                <FontAwesomeIcon icon={faTrash}/>
                            </button> 
                            </div>
                            </div>
                        </li>
                        </div>
                    )
                })
            }
          </ul>
        </div>
        <div className="Album-bodyy">
            <div className='album-container'>
                <div className='Album-title'>Create-Albums</div>
                    <form className='Album-form' onSubmit={handelOnSubmit} ref={todoRef}>
                        <div className='album-detalis'>
                    <div className='Album-box'>
                    <span className='al-detalis'>Enter Album Name</span>
                    <input 
                        type="text"
                        placeholder='Enter Album Name'
                        id="album-name"
                        name="name"
                        className='album-name'
                        value={names.name}
                        onChange={handelOnChange} />
                    </div>
                    <div className='Album-box'>
                    <span className='al-detalis'>Enter Description</span>
                    <input 
                        type="text"
                        placeholder='Album Description'
                        id="album-Description"
                        className='album-Description'
                        name="description"
                        value={names.description}
                        onChange={handelOnChange} />
                </div>
                <div className='Album-box'>
                <span className='al-detalis'>Enter Image URL</span>
                    <input 
                        type="url"
                        placeholder='Enter Url'
                        id="album-images"
                        className='album-images'
                        name="images"
                        value={names.images}
                        onChange={handelOnChange} />
                </div>
                <div className='Album-box'>
                <span className='al-detalis'>Enter image tags</span>
                    <input 
                        type="text"
                        placeholder='Album tags'
                        id="album-tags"
                        className='album-tags'
                        name="tags"
                        value={names.tags}
                        onChange={handelOnChange} />
                </div>
                </div>
                <div className='butt'>
                    <button className='form-button'>Submit😍</button>
                </div>
                </form>
                {error ? (
                    <div className='album-alert'>
                        <p className='album-msg'>Invalid</p>
                    </div>
                ) : null}
            </div>
        </div>
    </div>
  )
}

export default Album
