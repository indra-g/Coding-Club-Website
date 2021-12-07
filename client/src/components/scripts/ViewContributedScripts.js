import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios';
import userObj from '../../config/user_credentials';
//import {Redirect} from 'react-router-dom';
import '../../css/contributeScriptsScreen.css';
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
    // if(username!=''){
        
    // }
    // else{
    //     return (
    //         <Redirect to="/login" />
    //     )
    // }
    return(
        scriptsList.map((script)=>{
            return (
                <div className="contribute-script-card">
                    <h2>{script.Title}</h2>
                    <h4>{script.Contributor}</h4>
                    <h4>{script.Email}</h4>
                    <button className="add-contribute-button" onClick={()=>{addscriptfunction(script._id)}}> Add this Script</button>
                    <div className="edit-delete-area">
                        <button><a href={`/edit-contributed-scripts/${script._id}`}>Edit</a></button>
                        <button onClick={()=>{deletefunction(script._id)}}>Delete</button>
                    </div>
                </div>
            )
        })
    );
}

export default ViewContributedScripts
