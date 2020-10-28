import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import Posts from "./Posts";
import Editor from "./Editor";
import axios from "axios";
import { useParams } from "react-router";
// Grand Central Station for variables.
// Allowing Photo.js Editor.js and Posts.js to pass values to each other thru props

function Collaborator() {
  const { imageID } = useParams();

  // eliminating all the individual variables replacing with a single post object
  const [post, updPost] = useState({
    imageID: imageID,
    grayscale: 0,
    sepia: 0,
    hue: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1,
    user_email: "",
    notes: "",
  });
  // Used to add the transition class to the displayed photo.
  // Then removes it after 500ms to allow instant slider results.
  const [transClass, updTransClass] = useState("transition");

  // watches for when the .transition class is added to a photo thru props.
  // Then removes it after half a second.
  useEffect(() => {
    setTimeout(() => {
      updTransClass("transition");
    }, 400);
  }, [transClass]);

  const [posts, updPosts] = useState([]);

  // the request is filtered by th imagID of the currently choosen photo. Sorted by creation date
  useEffect(() => {
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/tblROo31txj731J6T?filterByFormula=imageID+%3D+%22${imageID}%22&sort%5B0%5D%5Bfield%5D=created_at&sort%5B0%5D%5Bdirection%5D=desc`;
    const getPosts = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      updPosts(data.data.records);
    };
    getPosts();
  }, [imageID]);
  const handleChange = (e) => {
    updTransClass("");
    const { name, value } = e.target;
    updPost({ ...post, [name]: Number(value) });
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    updPost({ ...post, [name]: value });
  };
  // Sending the appropriate props variables to each component
  return (
    <div className="collab">
      <Photo post={post} transClass={transClass} />
      <Editor
        post={post}
        updPost={updPost}
        updPosts={updPosts}
        handleChange={handleChange}
        handleTextChange={handleTextChange}
      />
      <Posts updPost={updPost} posts={posts} />
    </div>
  );
}

export default Collaborator;
