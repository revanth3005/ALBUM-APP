import './App.css';
import {Routes,Route,NavLink} from "react-router-dom"


//importing
import Home from "./Home/Home"
import Signup from './Sign-up/Signup';
import Signin from './Sign-in/Signin';
import Album from './Album/Album';
import AlbumEdit from './Album/AlbumEdit';


function App() {
  return (
    <div className="App">
     <div className='App-header'>
        <NavLink className="home-bt home add" to={"/Home"}>HOME</NavLink>
        <NavLink className="signup-bt signup add"  to={"/Signup"}>Sign-up</NavLink>
        <NavLink className="signin-bt signin add"  to={"/Signin"}>Sign-in</NavLink>
     </div>
     <div className='App-body'>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Signin' element={<Signin/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Album' element={<Album/>}/>
        <Route path='/albums/:id' element={<AlbumEdit/>}/>
      </Routes>
     </div>
     <div className='App-footer'>

     </div>
    </div>
  );
}

export default App;
