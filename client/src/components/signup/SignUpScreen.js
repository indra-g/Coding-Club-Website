import React from "react";
import "../../css/signupScreen.css";
import "../../css/loginScreen.css";
import { useState } from "react";
import Axios from "axios";
import validator from "validator";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/img/Finalwhitelogo.png";

function SignUpScreen() {
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  //For Username Validation
  const [nameError, setNameError] = useState(null);
  const validateName = (name) => {
    name.length >= 3
      ? setNameError(null)
      : setNameError("Invalid Name, Need atleast three characters");
    return name;
  };

  // For Email Validation
  const [emailError, setEmailError] = useState(null);
  const validateEmail = (email) => {
    //var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError(null);
    } else {
      setEmailError("Enter valid Email!");
    }
    return email;
  };

  // For Password Validation
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorColor, setPasswordErrorColor] = useState("red");

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
      setPasswordError("Strong Password!");
      setPasswordErrorColor("green");
    } else {
      setPasswordError("Password is weak!");
      setPasswordErrorColor("red");
    }
    return value;
  };

  const submitfunction = () => {

    if (emailid !== "" && password !== "") {
      if (emailid.includes("@psgtech.ac.in")) {
        Axios.post("/api/login/add", {
          email: emailid,
          password: password,
          username: username,
          name: username,
        })
          .then((result) => {
            if (result.data.success) {
              alert(result.data.message);
              history.push("/login");
            } else {
              alert(result.data.message);
            }
          })
          .catch((err) => {
            console.log(err.toString());
          });
      } else {
        setShowError(true);
        setError("Only PSG mails are allowed");
        setTimeout(() => setShowError(false), 3000);
      }
    } else {
      setShowError(true);
      setError("Email address and password are required");
      console.log(error, showError);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div class="wrapper">
      <div class="row top-box">
        <div class="col-8 background">
          <div class="login-wrapper">
            <h1 className="heading-text">Sign Up</h1>{" "}
            <label className="form-label formLabel">Username</label>
            <input
              type="text"
              value={username}
              placeholder="Enter Your Username"
              onChange={(e) => setUsername(validateName(e.target.value))}
              className="form-control inputField"
              id="UserName1"
            />
            {nameError?<p>{nameError}</p>:null}
            <label className="form-labell formLabel">Email</label>
            <input
              type="email"
              value={emailid}
              placeholder="Enter Your Email"
              onChange={(e) => setEmailid(validateEmail(e.target.value))}
              className="form-control inputField"
              id="Email1"
            />
            {emailError?<p>Invalid Email!</p>:null}
            <label className="form-labell formLabel">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(validatePassword(e.target.value))}
              className="form-control inputField"
              id="Password1"
            />
            {(passwordError === "Password is weak!")? <p>Minimum of 8 characters needed with least one character belonging to lowercase, uppercase, numbers and symbols. </p> :null}
            <div className="row">
              <div className="col">
                <h5 className="bot-text">
                  Already registered?
                  <Link to="/login"> Login</Link>
                </h5>
              </div>
              <div className="col"></div>
            </div>
            <div className="button">
              <button
                type="submit"
                onClick={submitfunction}
                className="btn btn-primary loginbutton"
              >
                Signup
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

export default SignUpScreen;
