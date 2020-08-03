import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import Posts from "./Posts";
import Editor from "./Editor";

function Collaborator() {
  const [grayscale, updateGrayscale] = useState(0);
  //console.log(grayscale);
  return (
    <div>
      <Photo grayscale={grayscale} updateGrayscale={updateGrayscale} />
      <Posts />
      <Editor grayscale={grayscale} updateGrayscale={updateGrayscale} />
    </div>
  );
}

export default Collaborator;
