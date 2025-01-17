import React, { useState } from "react";
//import axios from 'axios';
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Avatar } from "@mui/material";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState("");
  
    const registerHandler = async (e) => {
      e.preventDefault();
  
      try {
        const res = await fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          body: JSON.stringify({
            avatar,
            name,
            email,
            password,
          }),
          credentials: "include",
          mode: "cors",
        });
        const data = await res.json();
        if (data.success === true) {
          toast.success("Registration Successful");
          setError(null);
          navigate("/signin");
        } if (data.success !== true) {
          setError(data.message);
          toast.error(data.message);
        }
      } catch (error) {
        setError('An unexpected error occurred');
        toast.error("Registration Failed-An unexpected error occurred");
      }
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload= (e) => {
          if(Reader.readyState ===2) {
              setAvatar(Reader.result);
          }
      };
    }

return (
  <div className="box">
    <main className="mainContainer">
      <p className="welcomeText"> REGISTER </p>
      <p className="text"> TO THE HALL OF FAME </p>

      <div>
        <form method="POST" onSubmit={registerHandler}>

          <Avatar src={avatar} alt="User" sx={{ height:"10vmax", width:"10vmax" }} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            Register
          </button>
          <Link to="/signin">
              <p>Already Registered?</p>
          </Link>
          {error && <p>{error}</p>}
        </form>

        {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
      </div>
    </main>
  </div>
);
};

export default Signup;