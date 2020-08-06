import React, { useState } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";

function Newimage() {
  const [title, updTitle] = useState("");
  const [descr, updDescr] = useState("");
  const [urlUpload, updUrlUpload] = useState("");
  const [file, updFile] = useState([]);
  const [loading, updLoading] = useState(
    "enter a URL of the image you want to edit"
  );

  const upLoadCloud = async () => {
    const URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER_NAME}/upload`;
    console.log(urlUpload);
    try {
      await axios.post(
        URL,
        {
          fields: {
            title: title,
            description: descr,
            imageFile: [{ url: urlUpload }],
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

      updUrlUpload("");
      updLoading("Success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = "https://api.airtable.com/v0/appgSipibWEhbQcAf/images";
    console.log("url to upload", urlUpload);
    try {
      await axios.post(
        URL,
        {
          fields: {
            title: title,
            description: descr,
            imageFile: [{ url: urlUpload }],
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

      updUrlUpload("");
      updLoading("Success");
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
          placeholder="URL to upload"
          value={urlUpload}
          onChange={(e) => {
            updUrlUpload(e.target.value);
          }}
        ></input>
        {/* <input
          type="file"
          value={file}
          onChange={(e) => {
            updFile(e.target.value);
          }}
        ></input> */}
        <button className="button" type="submit">
          submit
        </button>
        <h4>{loading}</h4>
      </form>
    </div>
  );
}

export default Newimage;
