import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
//import logo from '../../../assets/img/logoCropped.png'
import logo from "../../../assets/img/logo.png";

function ItemDetail({ props }) {
  useEffect(() => {
    fetchItem();
    console.log("Item Props : ", props);
  }, []);
  const [item, setItem] = useState({});
  const [contributor, setcontributor] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [email, setemail] = useState("");
  const fetchItem = async () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/1`)
      .then((response) => {
        setItem(response.data);
        console.log(response);
      })
      .catch((reject) => {
        console.log(reject);
      });
    axios
      .get(`/api/scripts/${props.match.params.id}`)
      .then((script) => {
        console.log(script);
        setcontributor(script.data.Contributor);
        settitle(script.data.Title);
        setemail(script.data.Email);
        setcontent(script.data.Content);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };
  return (
    <div className="row">
      <div>
        <div
          className="card border-secondary"
          style={{ margin: "10px", borderRadius: "10px" }}
        >
          <div className="card-header">
            <div className="row">
              <div className="col-sm-1">
                <img
                  src={logo}
                  alt="can't fetch"
                  style={{ height: "50px", width: "90px" }}
                />
              </div>
              <div className="col-sm-4">
                <h3>
                  <b>PSG TECH CODING CLUB</b>
                </h3>
              </div>
              <div className="col-sm-7"></div>
            </div>
          </div>
          <div className="card-body" style={{ background: "#f2f2f2" }}>
            <h1 className="card-title text-center">{title}</h1>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <p>{content}</p>
          </div>
          <div className="card-footer text-muted">{contributor}</div>
        </div>
      </div>
      {/*<h1>Item</h1>
            <p>{
                item.id
            }</p>
            <p> BODY : {
                item.body
            }</p>
            <p> TITLE : {
                item.title
            }</p>*/}
    </div>
  );
}

export default ItemDetail;
