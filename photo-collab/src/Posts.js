import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Posts(props) {
  const { imageID } = useParams();
  const [posts, updatePosts] = useState([]);
  //let imageID = "recogH9MefyNngjMB";

  useEffect(() => {
    //const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/userEdits?sort%5B0%5D%5Bfield%5D=created_at&filterByFormula=%28%7BimageID%7D+%3D+%27${imageID}%27%29`;
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/tblROo31txj731J6T?filterByFormula=imageID+%3D+%22${imageID}%22&sort%5B0%5D%5Bfield%5D=created_at&sort%5B0%5D%5Bdirection%5D=desc`;
    const getPosts = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      console.log(data.data.records);
      updatePosts(data.data.records);
    };
    getPosts();
  }, [props.newPost]);
  // const displayPostEdits =

  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <p
                onClick={(e) => {
                  console.log(post);
                  //console.log(posts);
                  props.updDisplayPost(post);
                }}
              >
                {post.fields.user_email}
                <br />
                {post.fields.notes}
              </p>
            </div>
          );
        })}
    </>
  );
}

export default Posts;
