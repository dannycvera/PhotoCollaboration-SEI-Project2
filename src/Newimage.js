import React, { useState, useEffect } from "react";
import axios from "axios";

function Newimage() {
  const [title, updTitle] = useState("");
  const [descr, updDescr] = useState("");
  const [urlUpload, updUrlUpload] = useState("");
  const [file, updFile] = useState("");
  const [loadingImg, updLoadingImg] = useState(false);
  const [loading, updLoading] = useState("");
  // upload images to Cloudinary server. Then pass url to airtable
  // most of the code to upload to Cloudinary was aquired from Coding Shiksha's Video walktru
  // https://www.youtube.com/watch?v=cc0oMYaduuA
  const upLoadCloud = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      // const data = {
      //   context: {
      //     "alt": descr,
      //     "caption": title,
      //   },
      //   upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
      // };

      // data.append("file", e.target.files[0]);
      //data.append("file", urlUpload);

      // const data = {
      //   context:
      //   upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
      // };

      if (file !== "") {
        console.log(file);
        data.append("file", file);
      } else if (urlUpload !== "") {
        console.log(urlUpload);
        data.append("file", urlUpload);
      }

      data.append("context", `alt=${descr} | caption=${title}`);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      console.log(data);
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

        console.log(resCloud, resAirtable);
        updLoadingImg(false);
      } else {
        updLoading("Image failed to upload");
      }
      updTitle("");
      updDescr("");
      updUrlUpload("");
      setTimeout(() => {
        updLoading("");
        updUrlUpload("");
        updFile("");
      }, 3000);
      // updUrlUpload(res.data.secure_url);
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

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="newimage">
      <h2>add a new image to co-edit</h2>
      <form onSubmit={upLoadCloud}>
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
            urlUpload();
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
              console.log(e.target.files[0]);
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
