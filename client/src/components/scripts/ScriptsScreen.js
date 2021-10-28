import  Axios  from 'axios';
import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../../css/ScriptsScreen.css';

function ScriptsScreen() {
    const [scriptsList,setList]=useState([]);
    const [scriptsUpdate,setUpdate]=useState(1);
    useEffect(()=>{
        Axios.get('/api/scripts/').then((result)=>{
            if(result.data){
                setList(result.data)
            }
        }).catch((err)=>{
            if(err){
                console.log(err)
            }
        });
    },[scriptsUpdate]);
    // const editfunction=(id)=>{
    //     history.replace(`/edit-script/${id}`)
    //     // Axios.put(`/api/scripts/${id}`,{
    //     // })
    //     // .then((result)=>{
    //     //     if(result.data.succes){
    //     //         alert('Edited Successfully!!');
    //     //     }
    //     // })
    //     // .catch((err)=>{console.log(err.toString())});
    // }
    const deletefunction = (id)=>{
        Axios.delete(`/api/scripts/${id}`)
        .then((result)=>{
            if(result.data.success){
                alert('Deleted Successfully!!');
                setUpdate(scriptsUpdate+1);
            }
        })
        .catch((err)=>{console.log(err.toString())});
    }
    return (
        <div className="scripts-screen">
            <h1>Scripts Page</h1>
            {scriptsList && scriptsList.map((script)=>{
                return(
                    <div className="scripts-card">
                        <h2>Title : {script.Title}</h2>
                        <p>{script.Content}</p>
                        <h4>Contributor : {script.Contributor}</h4>
                        <h6>{script.Email}</h6>
                        <button className="read-script-button"><a href={`/view-script/${script._id}`}> Read Script </a></button>
                        <div className="scripts-button-area">
                            <button className='card-buttons'><Link to= {`/edit-script/${script._id}`}> Edit </Link></button>
                            <button className='card-buttons' onClick={()=>deletefunction(script._id)}> Delete </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ScriptsScreen
