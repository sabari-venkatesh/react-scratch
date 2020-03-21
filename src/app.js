import React from "react";
import "./app.css";
import Photo from "images/photo.jpg";

function component() {
  const element = document.createElement('span');

  // Lodash, now imported by this script
  element.innerHTML = "Hello webpack";
  element.classList.add('hello');

  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Photo;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());