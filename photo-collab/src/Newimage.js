import React, { useState } from "react";
import axios from "axios";

function Newimage() {
  const [title, updTitle] = useState("");
  const [descr, updDescr] = useState("");
  const [url, updUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = "https://api.airtable.com/v0/appgSipibWEhbQcAf/images";
    try {
      await axios.post(
        URL,
        {
          fields: {
            title: title,
            description: descr,
            url: url,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
          },
        }
      );
      updTitle("");
      updDescr("");
      updUrl("");
      //props.updNewPost(!props.newPost);
      //props.updNotes("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="newimage">
      <h2>add a new image to co-edit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => {
            updTitle(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="description"
          value={descr}
          onChange={(e) => {
            updDescr(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => {
            updUrl(e.target.value);
          }}
        ></input>
        <button className="button" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Newimage;
