import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import Posts from "./Posts";
import Editor from "./Editor";

function Collaborator() {
  const [gray, updGray] = useState(0);
  const [sepia, updSepia] = useState(0);
  //console.log(grayscale);
  return (
    <div>
      <Photo gray={gray} updGray={updGray} sepia={sepia} updSepia={updSepia} />
      <Posts />
      <Editor gray={gray} updGray={updGray} sepia={sepia} updSepia={updSepia} />
    </div>
  );
}

export default Collaborator;
