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
  const [newPost, updNewPost] = useState(false);
  const [email, updEmail] = useState("");
  const [notes, updNotes] = useState("");
  // used to pass the data object back from the Posts component when a previous post is clicked
  const [displayPost, updDisplayPost] = useState({});

  useEffect(() => {
    //console.log(displayPost, prevState.displayPost);
    if (displayPost.fields) {
      updGray(displayPost.fields.grayscale);

      updSepia(displayPost.fields.sepia);
      updHue(displayPost.fields.hue);
      updBright(displayPost.fields.brightness);
      updCtrast(displayPost.fields.contrast);
      updSatur(displayPost.fields.saturation);

      // updGray(displayPost.fields.grayscale);
      // updSepia(displayPost.fields.sepia);
      // updHue(displayPost.fields.hue);
      // updBright(displayPost.fields.brightness);
      // updCtrast(displayPost.fields.contrast);
      // updSatur(displayPost.fields.saturation);

      // updEmail(displayPost.fields.user_email);
      // updNotes(displayPost.fields.notes);
    }
    console.log("image settings", gray, sepia, hue, bright, ctrast, satur);
  }, [displayPost]);
  // Grand Central Station of post variables.
  // since it's the parent of all the editing and photo display modules
  return (
    <div className="collab">
      <Photo
        gray={gray}
        sepia={sepia}
        hue={hue}
        bright={bright}
        ctrast={ctrast}
        satur={satur}
      />
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
        email={email}
        updEmail={updEmail}
        notes={notes}
        updNotes={updNotes}
        newPost={newPost}
        // used to let the Posts component know there is a new post
        updNewPost={updNewPost}
        updDisplayPost={updDisplayPost}
        //displayPost={displayPost}
      />
      <Posts newPost={newPost} updDisplayPost={updDisplayPost} />
    </div>
  );
}

export default Collaborator;
