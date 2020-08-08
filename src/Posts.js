import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Posts(props) {
  const { imageID } = useParams();
  const [posts, updPosts] = useState([]);

  // retrieves posts from airtable when the props.newPost is changed.
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
  }, [props.newPost, imageID]);
  // displaying all the posts
  return (
    <div className="posts-list">
      {posts &&
        posts.map((post) => {
          return (
            <button
              key={post.id}
              className="post-button"
              onClick={(e) => {
                e.stopPropagation();

                // used to add the transition class to the current photo.
                // just for added cool factor
                props.updTransClass("transition");

                props.updDisplayPost(post);
              }}
            >
              {/* email link option. Not sure if I want to impliment this since it can be annoying for fat fingered people.
                <a
                  href={`mailto:${post.fields.user_email}?subject=Lets chat about your photo edit&body=${window.location.href}`}
                >
                </a> */}
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
