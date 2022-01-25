// import React from 'react'
import React from "react";
import { useState } from "react";
import "../../css/loginScreen.css";
import validator from "validator";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/img/Finalwhitelogo.png";
function ForgotPasswordScreen() {
    const [emailid, setEmailid] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setconfirmpassword]=useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const history = useHistory();
    const validatePassword = (value) => {
        if (
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          setError("Strong Password!");
        } else {
          setError("Password is weak!");
        }
        return value;
      };    
    const submitFunction = () => {
      if (emailid !== "" && password!="" && password==confirmPassword) {
        if (emailid.includes("@psgtech.ac.in")) {
          console.log("Hey");
          Axios.post("/api/forgotpassword", {
            email: emailid,
            password:password,
          })
            .then((result) => {
              if (result.data.success) {
                alert(result.data.message);
                history.push("/events-home");
              } else {
                console.log(result);
                setShowError(true);
                alert(result.data.message);
                setTimeout(() => setShowError(false), 3000);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setShowError(true);
          alert("Only PSG mails are allowed");
          setTimeout(() => setShowError(false), 3000);
        }
      } else if(password != confirmPassword){
        setShowError(true);
        alert("Passwords don't match");
        setTimeout(() => setShowError(false), 3000);  
      }
      else {
        setShowError(true);
        alert("Email address and Password are required");
        setTimeout(() => setShowError(false), 3000);
      }
    };
  
    return (
      <div class="wrapper">
        <div class="row top-box">
          <div class="col-8 background">
            <div class="login-wrapper">
              <h1 className="heading-text">Forgot Password Section</h1>{" "}
              <label className="form-label formLabel">Email</label>
              <input
                type="email"
                value={emailid}
                placeholder="Enter Your Email"
                onChange={(e) => setEmailid(e.target.value)}
                className="form-control inputField"
                id="Email1"
              />
              <label className="form-label formLabel">New Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter Your New Password"
                onChange={(e) => setPassword(validatePassword(e.target.value))}
                className="form-control inputField"
                id="Password1"
              />
              {(error === "Password is weak!")? <p>Minimum of 8 characters needed with least one character belonging to lowercase, uppercase, numbers and symbols. </p> :null}
              <label className="form-label formLabel">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                placeholder="ReEnter Your New Password"
                onChange={(e) => setconfirmpassword(e.target.value)}
                className="form-control inputField"
                id="Password2"
              />
              <div className="row">
                <div className="col">
                  <h5 className="bot-text">
                    Back to
                    <Link to="/signup"> Register </Link>
                  </h5>
                </div>
              </div>
              <div className="button">
                <button
                  type="submit"
                  onClick={submitFunction}
                  className="btn btn-primary loginbutton"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div class="col rightbox background">
            <div className="login-content-wrapper">
              <img className="img" src={logo} alt="logo" />
              <h4 className="texts">Psg Tech Coding Club</h4>
              <h5 className="texts bot-text1">
                Simple things should be simple, complex things should be possible
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ForgotPasswordScreen
