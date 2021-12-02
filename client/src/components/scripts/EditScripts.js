import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "../../css/ScriptsScreen.css";

function EditScripts(props) {
  const history = useHistory();
  const [contributor, setcontributor] = useState("");
  const [title, settitle] = useState("");
  const [email, setemail] = useState("");
  const [content, setcontent] = useState("");

  const goToAllScriptsPage = () => {
    history.goBack();
  };

  const submitfunction = () => {
    Axios.post(`/api/scripts/${props.match.params.id}`, {
      title: title,
      contributor: contributor,
      email: email,
      content: content,
    })
      .then((result) => {
        if (result.data.success) {
          alert("Edited Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Axios.get(`/api/scripts/${props.match.params.id}`)
      .then((result) => {
        setcontributor(result.data.Contributor);
        settitle(result.data.Title);
        setemail(result.data.Email);
        setcontent(result.data.Content);
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }, []);

  return (
    <div className="edit-scripts-screen">
      <input
        type="text"
        name=""
        placeholder="Enter Contributor Name"
        value={contributor}
        onChange={(e) => {
          setcontributor(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => {
          settitle(e.target.value);
        }}
      />
      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => {
          setcontent(e.target.value);
        }}
      />
      <button type="submit" onClick={submitfunction}>
        {" "}
        Submit{" "}
      </button>
      <button onClick={goToAllScriptsPage}> Back to Scripts Page</button>
    </div>
  );
}

export default EditScripts;
