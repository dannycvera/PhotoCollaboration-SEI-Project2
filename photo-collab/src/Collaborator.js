import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import Posts from "./Posts";
import Editor from "./Editor";

function Collaborator() {
  const [gray, updGray] = useState(0);
  const [sepia, updSepia] = useState(0);
  const [hue, updHue] = useState(0);
  const [bright, updBright] = useState(1);
  const [ctrast, updCtrast] = useState(1);
  const [satur, updSatur] = useState(1);

  //console.log(grayscale);
  return (
    <div className="collab">
      <Photo
        gray={gray}
        updGray={updGray}
        sepia={sepia}
        updSepia={updSepia}
        hue={hue}
        updHue={updHue}
        bright={bright}
        updBright={updBright}
        ctrast={ctrast}
        updCtrast={updCtrast}
        satur={satur}
        updSatur={updSatur}
      />
      <Posts />
      <Editor
        gray={gray}
        updGray={updGray}
        sepia={sepia}
        updSepia={updSepia}
        hue={hue}
        updHue={updHue}
        bright={bright}
        updBright={updBright}
        ctrast={ctrast}
        updCtrast={updCtrast}
        satur={satur}
        updSatur={updSatur}
      />
    </div>
  );
}

export default Collaborator;
