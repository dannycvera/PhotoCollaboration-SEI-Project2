import React from "react";

function Posts(props) {
  const { updPost, posts } = props;

  // displaying all the posts
  return (
    <div className="posts-list">
      {posts &&
        posts.map((el) => {
          return (
            <button
              key={el.id}
              className="post-button"
              onClick={(e) => {
                e.stopPropagation();

                // used to add the transition class to the current photo.
                // just for added cool factor
                const clickedPost = { ...el.fields };
                delete clickedPost.created_at;
                clickedPost.user_email = "";
                clickedPost.notes = "";
                updPost(clickedPost);
              }}
            >
              {/* email link option. Not sure if I want to impliment this since it can be annoying for fat fingered people.
                <a
                  href={`mailto:${post.fields.user_email}?subject=Lets chat about your photo edit&body=${window.location.href}`}
                >
                </a> */}
              {el.fields.user_email}
              <br />
              {el.fields.notes}
            </button>
          );
        })}
    </div>
  );
}

export default Posts;
