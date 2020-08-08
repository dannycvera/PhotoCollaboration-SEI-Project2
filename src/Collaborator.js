import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import Posts from "./Posts";
import Editor from "./Editor";
// Grand Central Station for variables.
// Allowing Photo.js Editor.js and Posts.js to pass values to each other thru props

function Collaborator() {
  const [gray, updGray] = useState(0);
  const [sepia, updSepia] = useState(0);
  const [hue, updHue] = useState(0);
  const [bright, updBright] = useState(1);
  const [ctrast, updCtrast] = useState(1);
  const [satur, updSatur] = useState(1);
  const [email, updEmail] = useState("");
  const [notes, updNotes] = useState("");
  // used to signal to the Posts.js to make a new request when a new post is added.
  const [newPost, updNewPost] = useState(false);
  // Used to add the transition class to the displayed photo.
  // Then removes it after 500ms to allow instant slider results.
  const [transClass, updTransClass] = useState("");
  // used to pass the data object back from the Posts component when a previous post is clicked
  const [displayPost, updDisplayPost] = useState({});

  // Post.js will update displayPost with fields when it adds a new post.
  // Signalling to update the CSS image filters values from the new post
  useEffect(() => {
    if (displayPost.fields) {
      updGray(displayPost.fields.grayscale);
      updSepia(displayPost.fields.sepia);
      updHue(displayPost.fields.hue);
      updBright(displayPost.fields.brightness);
      updCtrast(displayPost.fields.contrast);
      updSatur(displayPost.fields.saturation);
    }
    updDisplayPost({});
  }, [displayPost.fields]);

  // watches for when the .transition class is added to a photo thru props.
  // Then removes it after half a second.
  useEffect(() => {
    setTimeout(() => {
      updTransClass("");
    }, 400);
  }, [transClass]);

  // Sending the appropriate props variables to each component
  return (
    <div className="collab">
      <Photo
        gray={gray}
        sepia={sepia}
        hue={hue}
        bright={bright}
        ctrast={ctrast}
        satur={satur}
        transClass={transClass}
        updTransClass={updTransClass}
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
        // Posts.js sends data to the Editor.js to display in the sliders
        newPost={newPost}
        // used to let the Posts component know there is a new post
        updNewPost={updNewPost}
        updDisplayPost={updDisplayPost}
        // adds a transition class when reseting the values to the displayed image
        updTransClass={updTransClass}
      />
      <Posts
        newPost={newPost}
        updDisplayPost={updDisplayPost}
        // adds a transition class when switching between posts to the displayed image
        updTransClass={updTransClass}
      />
    </div>
  );
}

export default Collaborator;
