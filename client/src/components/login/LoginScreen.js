import React from "react";
import { useState } from "react";
import "../../css/loginScreen.css";
import "../../css/signupScreen.css";
import Axios from "axios";
import userObj from "../../config/user_credentials";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/img/Finalwhitelogo.png";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function LoginScreen() {
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const history = useHistory();
  const submitFunction = () => {
    if (emailid !== "" && password !== "") {
      if (emailid.includes("@psgtech.ac.in")) {
        Axios.post("/api/login", {
          email: emailid,
          password: password,
        })
          .then((result) => {
            if (result.data.success) {
              userObj.username = result.data.username;
              localStorage.setItem("token", result.data.token);
              //localStorage.setItem( 'email' , this.loginUserData.email )
              alert("Successfully Logged In");
              history.push("/events-home");
              // Object.freeze(User);
            } else {
              console.log(result);
              setShowError(true);
              setError(result.data.message);
              setTimeout(() => setShowError(false), 3000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setShowError(true);
        setError("Only PSG mails are allowed");
        setTimeout(() => setShowError(false), 3000);
      }
    } else {
      setShowError(true);
      setError("Email address and password are required");
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // return (
  //     <div className="login-area">
  //         <input type="text" name="email" placeholder="Enter Your Email" onChange={(e)=>{setemailState(e.target.value)}}/>
  //         <input type="password" name="password" placeholder="Enter Your Password" onChange={(e)=>{setpasswordState(e.target.value)}}/>
  //         <button type="submit" onClick={submitFunction}> Submit </button>
  //         <a href="/"> Back to Homepage </a>
  //     </div>
  // );

  return (
    // <div className="container loginTop">
    //   <div className="row">
    //     <div className="col-md-12 col-lg-9">
    //       <div className="col" />
    //       <div className="col-sm-10 col-md-8 leftbox">
    //         <div className="row">
    //           <div className="col"></div>
    //           <div className="col-6 login">
    //             <center>
    //               {showError && (
    //                 <Stack sx={{ width: "80%" }}>
    //                   <Alert variant="filled" severity="error">
    //                     {error}
    //                   </Alert>
    //                 </Stack>
    //               )}
    //             </center>
    //             <center className="mb-4 loginTitle">Log In</center>
    //             <div className="mb-3">
    //               <label className="form-label formLabel">Email</label>
    //               <input
    //                 type="email"
    //                 value={emailid}
    //                 onChange={(e) => setEmailid(e.target.value)}
    //                 className="form-control inputField"
    //                 id="Email1"
    //               />
    //             </div>
    //             <div className="mb-3">
    // <label className="form-label formLabel">Password</label>
    // <input
    //   type="password"
    //   value={password}
    //   onChange={(e) => setPassword(e.target.value)}
    //   className="form-control inputField"
    //   id="Password1"
    // />
    //             </div>

    //             <div className="row">
    //               <div className="col">
    //                 Not a member? <Link to="/signup">Register</Link>
    //               </div>
    //               <div className="col">
    //                 <Link style={{ float: "right" }} to="/forgetpassword">
    //                   Forget Password?
    //                 </Link>
    //               </div>
    //             </div>

    //             <div className="row justify-content-center">
    //               <div className="col" />
    //               <div className="col">
    //                 <button
    //                   type="submit"
    //                   onClick={submitFunction}
    //                   className="mt-4 btn btn-primary loginbutton"
    //                 >
    //                   Login
    //                 </button>
    //               </div>

    //               <div className="col" />
    //             </div>
    //           </div>
    //           <div className="col" />
    //         </div>
    //       </div>
    //       <div className="col" />
    //     </div>

    //     <div className="col-lg-3 rightbox textStyle d-none d-lg-block d-xl-block">
    //       <div className="img_container">
    //         <center>
    // <img
    //   src={logo}
    //   alt="can't fetch"
    //   height={"250px"}
    //   width={"250px"}
    // />
    //         </center>
    //         <br />
    //         <br />
    //         <br />
    //         <div className="text-block">
    // <h4>
    //   <b>Psg Tech Coding Club</b>
    // </h4>
    //           <span className="bottomText">
    //             Simple things should be simple, complex things should be
    //             possible.
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="wrapper">
      <div class="row top-box">
        <div class="col-8 background">
          <div class="login-wrapper">
            <h1 className="heading-text">Log In</h1>{" "}
            <label className="form-label formLabel">Email</label>
            <input
              type="email"
              value={emailid}
              placeholder="Enter Your Email"
              onChange={(e) => setEmailid(e.target.value)}
              className="form-control inputField"
              id="Email1"
            />
            <label className="form-labell formLabel">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control inputField"
              id="Password1"
            />
            <div className="row">
              <div className="col">
                <h5 className="bot-text">
                  Not a member?
                  <Link to="/signup"> Register </Link>
                </h5>
              </div>
              <div className="col">
                <Link style={{ float: "right" }} to="/forgetpassword">
                  <h5 className="bot-text forget-pass">Forget Password?</h5>
                </Link>
              </div>
            </div>
            <div className="button">
              <button
                type="submit"
                onClick={submitFunction}
                className="btn btn-primary loginbutton"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div class="col rightbox background">
          <div className="content-wrapper">
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
export default LoginScreen;
