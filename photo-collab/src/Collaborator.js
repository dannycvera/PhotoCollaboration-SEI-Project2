import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import Posts from "./Posts";
import Editor from "./Editor";

function Collaborator() {
  return (
    <div>
      <Photo />
      <Posts />
      <Editor />
    </div>
  );
}

export default Collaborator;
