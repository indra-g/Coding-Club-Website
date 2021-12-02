import React from "react";
import MultiActionAreaCard from "./card";
import { useState, useEffect } from "react";
import Axios from "axios";

const ListofScripts = () => {
  const [scriptsList, setList] = useState([]);
  const [scriptsUpdate, setUpdate] = useState(1);
  useEffect(() => {
    Axios.get("/api/scripts/")
      .then((result) => {
        if (result.data) {
          setList(result.data);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }, [scriptsUpdate]);
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
  // const deletefunction = (id) => {
  //   Axios.delete(`/api/scripts/${id}`)
  //     .then((result) => {
  //       if (result.data.success) {
  //         alert("Deleted Successfully!!");
  //         setUpdate(scriptsUpdate + 1);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.toString());
  //     });
  // };

  return (
    <div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {scriptsList &&
              scriptsList.map((script) => {
                return (
                  <div className="col" key={script._id}>
                    <MultiActionAreaCard scriptData={script} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListofScripts;
