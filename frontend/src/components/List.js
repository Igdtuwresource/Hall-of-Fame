import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo1 from '../images/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import './List.css';
import toast from "react-hot-toast";
//import {UserAuth} from '../context/AuthContext'

const List=()=>{

    // const {user, logOut} = UserAuth();

    // const handleSignOut = async () => {
    //   try{
    //     await logOut()
    //   } catch(error){
    //     console.log(error);
    //   }
    // }

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
  
    async function getUser() {
      const res = await fetch("/api/user/whoami", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === true) {
        setUser(data.user);
      }
    }

    async function handleLogOut() {
        const res = await fetch("/api/user/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          credentials: "include",
        });
        toast.success("Logout Successful");
        navigate("/signin");
      }
  
    useEffect(() => {
      getUser();
    }, []);


    return(
        <>
        <header>
            <div className='container container-flex'>
                <div className='logoContainer'>
                    <img src={logo1} alt="logo" className='logo'/>
                </div>
                <nav>
                    <div className='list'>
                        <NavLink exact="true" to="/achievements" className="listItem" activeclassname="active">Home</NavLink>
                        <NavLink exact="true" to="/About" className="listItem" activeclassname="active">About</NavLink>
                        <NavLink to="/edit" className="listItem" activeclassname="active">Edit Profile</NavLink>
                        <NavLink to="/Form" className="listItem" activeclassname="active">Add Achievements</NavLink>
                        <NavLink to="/achievements" className="listItem" activeclassname="active" onClick={handleLogOut}>Logout</NavLink>
                        
                    </div>
                </nav>
                <div className='icons'>
                    {/* <SearchIcon className='icon'/> */}
                    {/* <PersonIcon className='icon'/>
                    <EmailIcon className='icon'/> */}

                </div>

            </div> 
            
        </header>
        </>
    )

}
export default List;