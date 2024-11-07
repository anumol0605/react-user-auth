import React from 'react';
import './Home.css';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logouts } from "../../redux/authSlice";

export default function Home() {
  const Navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.user);
  console.log("data from there",userdata);
  const dispatch = useDispatch();
      
    const handleLogout = () => {
		//localStorage.removeItem("token");
    dispatch(logouts());
    //window.location = "/";
    Navigate('/');
	};

  return (
    <div className="main_container">
    <nav className="navbar">
        <h1>MY WEB_APP</h1>
        <div className='navlast'>

        <Link to="/profile" className='proflink'> Profile </Link>
        <button className="white_btn" onClick={handleLogout}>
            Logout
        </button>
        </div>
    </nav>
    <div>
           <h2 className='welcome'> "Welcome {userdata.firstName}  {userdata.lastName}"</h2>
    </div>
</div>
  )
}
