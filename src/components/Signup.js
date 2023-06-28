import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [creds,setcreds]=useState({name:"",email:"",password:""});

    const onChange=(e)=>{
        setcreds({...creds,[e.target.name]:e.target.value});
   }
   const navigate=useNavigate();

   const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=creds;
    
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
              
            },
      
            body: JSON.stringify({ name,email, password}),
          });
          const json=await response.json();

          if(json.success===true){
            localStorage.setItem('token',json.authtoken);
            navigate('/');

          }


   }
  return (
    <div className="container">
    <h2>Sign Up to notebook</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
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
          />
        </div>

        <div class="mb-3">
          <label for="cpassword" class="form-label">
            Confirm Password
          </label>
          <input
            type="cpassword"
            class="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Signup;

