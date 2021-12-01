import React from "react";
import MultiActionAreaCard from "./card";
// import { useState } from "react";
// import Axios from "axios";
// import { Link, useHistory } from "react-router-dom";

function listofScripts() {
  return (
    <div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
              <MultiActionAreaCard />
            </div>
            <div className="col">
              <MultiActionAreaCard />
            </div>
            <div className="col">
              <MultiActionAreaCard />
            </div>
            <div className="col">
              <MultiActionAreaCard />
            </div>
            <div className="col">
              <MultiActionAreaCard />
            </div>
            <div className="col">
              <MultiActionAreaCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default listofScripts;
