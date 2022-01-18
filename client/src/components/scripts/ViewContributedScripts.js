import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios';
import userObj from '../../config/user_credentials';
//import {Redirect} from 'react-router-dom';
import '../../css/contributeScriptsScreen.css';
import MediaCard from "./ContributedScriptsCard";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import logo from "../../assets/img/logoCropped.png";
import Typography from "@mui/material/Typography";

function ViewContributedScripts() {
    const [scriptsList,setList]=useState([]);
    const [update,setUpdate]=useState(1);
    const [username,setusername]=useState('');
    const addscriptfunction=(id)=>{
        Axios.post(`/api/add-contributed-script/${id}`,{
            'acceptor':username
        }).then((result)=>{
            if(result.data.success){
                alert('Added To Scripts Successfully!!')
            }
        })
        .catch((err)=>{
            console.log(err.toString())
        })
    }
    const deletefunction = (id)=>{
        Axios.delete(`/api/contribute-scripts/${id}`).then((result)=>{
            if(result.data.success){
                alert('Deleted Successfully');
                setUpdate(update+1);
            }
        })
        .catch((err)=>{
            console.log(err.toString())
        })
    }
    useEffect(()=>{
        if(userObj.username!==''){
            setusername(userObj.username)
        }
        Axios.get('/api/contribute-scripts')
        .then((result)=>{
            if(result.data.success){
                setList(result.data.contributes)
            }
        })
        .catch((err)=>{console.log(err.toString())})
    },[update])

    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color="transparent" elevation={0} position="static">
                    <Toolbar>
                        <Link to="/events-home">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <img
                                    src={logo}
                                    alt="can't fetch"
                                    style={{ height: "50px", width: "90px" }}
                                />
                            </IconButton>
                        </Link>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1, fontWeight: "bold" }}
                        >
                            PSG Tech Coding Club
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <hr/>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {scriptsList &&
                        scriptsList.map((script) => {
                            return (
                                <div className="col-xm-3" key={script._id}>
                                    <MediaCard scriptData={script} />
                                </div>
                            );
                        })}
                </div>
            </div>
            <hr/>
            <div className="footer">
                <Link to="/" class="fa fa-instagram" />
                <Link to="/" class="fa fa-facebook" />
                <Link to="/" class="fa fa-envelope-square" />
                <span className="copyright-text">
              <p>© Copyright 2021 Coding Club</p>
            </span>
            </div>
        </div>
    );
}

export default ViewContributedScripts
