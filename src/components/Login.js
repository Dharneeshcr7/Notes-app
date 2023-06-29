import React,{useState} from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [creds,setcreds]=useState({email:"",password:""});

    const onChange=(e)=>{
        setcreds({...creds,[e.target.name]:e.target.value});
   }
   let navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
              
            },
      
            body: JSON.stringify({ email:creds.email, password:creds.password}),
          });
          const authtoken = await response.json();
          console.log(authtoken);

          if(authtoken.success===true){
            localStorage.setItem('token',authtoken.authtoken);
            navigate('/');


          }
          else{
            alert("Invalid Credentials");
          }


    }
  return (
    <form onSubmit={handleSubmit}>
    <h2>Login in to NoteBook</h2>
      <div class="mb-3">
        <label for="email" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          onChange={onChange}
          value={creds.email}
        />
        
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="password"
          name="password"
          onChange={onChange}
          value={creds.password}
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;

