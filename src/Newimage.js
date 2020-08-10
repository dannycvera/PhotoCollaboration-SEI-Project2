import React, { useState } from "react";
import axios from "axios";

function Newimage() {
  const [title, updTitle] = useState("");
  const [descr, updDescr] = useState("");
  const [urlUpload, updUrlUpload] = useState("");
  const [file, updFile] = useState("");
  const [loadingImg, updLoadingImg] = useState(false);
  const [loading, updLoading] = useState("There is a 10 MB file size limit");
  // upload images to Cloudinary server. Then pass url to airtable
  // most of the code to upload to Cloudinary was aquired from Coding Shiksha's Video walktru
  // https://www.youtube.com/watch?v=cc0oMYaduuA

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (file !== "") {
        // console.log(file);
        data.append("file", file);
      } else if (urlUpload !== "") {
        // console.log(urlUpload);
        data.append("file", urlUpload);
      }

      data.append("context", `alt=${descr} | caption=${title}`);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      // console.log(data);
      updLoadingImg(true);
      const URLCloud = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER_NAME}/image/upload`;
      const resCloud = await axios.post(URLCloud, data);
      // combining the submit with uploading to cloudinary

      if (resCloud.data.secure_url) {
        const URLAirtable = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_ID}/images`;
        const resAirtable = await axios.post(
          URLAirtable,
          {
            fields: {
              title: title,
              description: descr,
              imageFile: [
                {
                  // using cloudinary to generate an image with a height of 1100px.
                  // Then load it into airtable. This is for faster load times. Airtable also generates the thumbnails automatically
                  url: `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_SERVER_NAME}/image/upload/h_1100,c_fill,dpr_auto/${resCloud.data.public_id}.${resCloud.data.format}`,
                },
              ],
              // only the url will be passd to airtable
              imageUrl: resCloud.data.secure_url,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
            },
          }
        );
        updLoading("Success");

        //console.log(resCloud, resAirtable);
      } else {
        updLoading("Image failed to upload");
      }
      updLoadingImg(false);
      updTitle("");
      updDescr("");
      updUrlUpload("");
      updFile("");

      // updUrlUpload(res.data.secure_url);
    } catch (error) {
      updLoadingImg(false);
      updLoading(
        "Image failed to upload. Please check the URL or Filetype. Also make sure your image is smaller than 10MB's"
      );

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
        <label htmlFor="file-upload" className="file-button">
          choose file
          <input
            id="file-upload"
            type="file"
            name="file"
            accepts=".jpg, .jpeg, .png .gif"
            placeholder="upload an image"
            onChange={(e) => {
              updLoadingImg(true);
              //console.log(e.target.files[0]);
              const reader = new FileReader();
              reader.onload = (e) => {
                updFile(e.target.result);

                updLoadingImg(false);
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
          ></input>
        </label>
        <button className="button" type="submit">
          submit
        </button>
        <br />
        {loadingImg ? (
          <h3>Loading...</h3>
        ) : file !== "" ? (
          <img
            className="file-thumb"
            src={file}
            alt={"The file has uploaded"}
          ></img>
        ) : (
          <></>
        )}
        <br />
        <h3>{loading}</h3>
      </form>
    </div>
  );
}

export default Newimage;
