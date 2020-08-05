import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Posts(props) {
  const { imageID } = useParams();
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
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

  return (
    <div className="posts-list">
      {posts &&
        posts.map((post) => {
          return (
            <button
              key={post.id}
              className="post-button"
              onClick={(e) => {
                console.log(post);
                //console.log(posts);
                props.updDisplayPost(post);
              }}
            >
              {post.fields.user_email}
              <br />
              {post.fields.notes}
            </button>
          );
        })}
    </div>
  );
}

export default Posts;
