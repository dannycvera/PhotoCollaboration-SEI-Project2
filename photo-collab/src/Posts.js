import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Posts() {
  const { imageID } = useParams();
  const [posts, updatePosts] = useState([]);
  //let imageID = "recogH9MefyNngjMB";

  useEffect(() => {
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/userEdits?filterByFormula=%28%7BimageID%7D+%3D+%27${imageID}%27%29`;
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
  }, []);

  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <p>
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
