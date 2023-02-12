import { useState, useContext } from "react";
import { GlobalContext } from "../context/context";
import { Button, TextField } from "@mui/material";

import "./login.css";
import axios from "axios";

// const baseUrl = "http://localhost:5001/api/v1";



let baseUrl = "";
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:5001`;
}
else {
  baseUrl = `https://context-api-with-jwt.cyclic.app`;
}

function Login() {
  let { state, dispatch } = useContext(GlobalContext);

  const [result, setResult] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        `${baseUrl}/api/v1/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "USER_LOGIN",
        payload: null,
      });

      console.log("login successful");
      setResult("login successful");
    } catch (e) {
      console.log("e: ", e);
    }

    // e.reset();
  };

  //   if(document.getElementById('exampleInputEmail1') === ""){
  // '<span> </span>'

  //   }
  return (
    <>
      <div className="container login-page">
        <div className="row">
          <div className="col">
            
            <h1 className="login-heading">SAYLANI WALFARE</h1>
            <h4 className="login-sub-heading">ONLINE DISCOUNT STORE</h4>
            {state.text}
            
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
          
       

    </>
  );
}

export default Login;
