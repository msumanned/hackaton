import { useState } from "react";
import axios from "axios";
import "./signup.css";

// const baseUrl = "http://localhost:5001/api/v1";

let baseUrl = "";
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:5001`;
} else {
  baseUrl = `https://context-api-with-jwt.cyclic.app`;
}

function Signup() {
  const [result, setResult] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(`${baseUrl}/api/v1/signup`, {
        firstName: name,
        contact: name,
        email: email,
        password: password,
      });

      console.log("signup successful");
      alert("Signup Successfully")
      setResult("signup successful");
    } catch (e) {
      console.log("e: ", e);
    }

    // e.reset();
  };

  return (
    <div className="container signup-page">
      <h1 className="signup-heading">SAYLANI WALFAE</h1>
      <h4 className="signup-sub-heading">ONLINE DISCOUNT STORE</h4>
      <form onSubmit={signupHandler}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="contact"
            aria-label="contact"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="email"
            aria-label="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            aria-label="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {/* <input
            type="password"
            className="form-control"
            placeholder="confirm password"
            aria-label="password"
          /> */}
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
