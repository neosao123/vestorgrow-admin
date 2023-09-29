import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

window.tinyAPIKEY="e8w755v72e92ytu4phfw2z4wgycbeq7x2twygyk0umom9ot3";
window.user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;

ReactDOM.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
 ,
  document.getElementById("root")
);

