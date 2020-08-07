import React, { useState } from "react";
import axios from "axios";

function Newimage() {
  const [title, updTitle] = useState("");
  const [descr, updDescr] = useState("");
  const [urlUpload, updUrlUpload] = useState("");

  const [loadingImg, updLoadingImg] = useState(false);
  const [loading, updLoading] = useState("");
  // upload images to Cloudinary server. Then pass url to airtable
  const upLoadCloud = async (e) => {
    try {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      updLoadingImg(true);
      const URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER_NAME}/image/upload`;
      const res = await axios.post(URL, data);

      updLoadingImg(false);
      updUrlUpload(res.data.secure_url);
    } catch (error) {
      console.error(error);
    }
  };
  // post data to airtable with Cloudinary link if available
  const handleSubmit = async (e) => {
    e.preventDefault();
    updLoading("loading ...");
    const URL = "https://api.airtable.com/v0/appgSipibWEhbQcAf/images";

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
      setTimeout(() => {
        updLoading("");
      }, 3000);
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
          placeholder="URL of image or choose a file locally below"
          value={urlUpload}
          onChange={(e) => {
            updUrlUpload(e.target.value);
          }}
        ></input>
        <br />

        <input
          type="file"
          name="file"
          accepts="image/*"
          placeholder="upload an image"
          onChange={upLoadCloud}
        ></input>

        <button className="button" type="submit">
          submit
        </button>
        <br />
        {loadingImg ? (
          <h3>Loading...</h3>
        ) : (
          <img
            src={urlUpload}
            alt={urlUpload ? "File has uploaded correctly" : ""}
            style={{ width: "100px" }}
          ></img>
        )}
        <br />
        <h3>{loading}</h3>
      </form>
    </div>
  );
}

export default Newimage;
