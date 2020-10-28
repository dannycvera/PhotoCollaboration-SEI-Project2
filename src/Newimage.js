import React, { useState } from "react";
import axios from "axios";

function Newimage() {
  const [imgUpl, updImgUpl] = useState({
    title: "",
    description: "",
    imageUrl: "",
    file: "",
  });
  const { title, description, imageUrl, file } = imgUpl;
  const [loading, updLoading] = useState("There is a 10 MB file size limit");
  // upload images to Cloudinary server. Then pass url to airtable
  // most of the code to upload to Cloudinary was aquired from Coding Shiksha's Video walktru
  // https://www.youtube.com/watch?v=cc0oMYaduuA

  const handleChange = (e) => {
    const { name, value } = e.target;
    updImgUpl({ ...imgUpl, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (file !== "") {
        data.append("file", file);
      } else if (imageUrl !== "") {
        data.append("file", imageUrl);
      }
      data.append("context", `alt=${description} | caption=${title}`);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      updLoading("Loading...");
      const URLCloud = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER_NAME}/image/upload`;
      const resCloud = await axios.post(URLCloud, data);
      // combining the submit with uploading to cloudinary

      if (resCloud.data.secure_url) {
        const URLAirtable = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_ID}/images`;
        await axios.post(
          URLAirtable,
          {
            fields: {
              title: title,
              description: description,
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
      } else {
        updLoading("Image failed to upload");
      }
      updImgUpl({ title: "", description: "", imageUrl: "", file: "" });
    } catch (error) {
      updLoading(
        "Image failed to upload. Please check the URL or Filetype. Also make sure your image is smaller than 10MB's"
      );
      console.error(error);
    }
  };

  const Thumbnail = () => {
    if (loading !== "Loading..." && file !== "") {
      return (
        <img
          className="file-thumb"
          src={file}
          alt={"The file has uploaded"}
        ></img>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="new-image">
      <h2>add a new image to co-edit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="imageUrl"
          placeholder="URL of image or choose a file locally below"
          value={imageUrl}
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="file-upload" className="file-button">
          choose file
          <input
            id="file-upload"
            type="file"
            name="file"
            accept=".jpg, .jpeg, .png, .gif"
            placeholder="upload an image"
            onChange={(e) => {
              updLoading("Loading...");
              const reader = new FileReader();
              reader.onload = (e) => {
                updImgUpl({ ...imgUpl, file: e.target.result });
              };
              try {
                reader.readAsDataURL(e.target.files[0]);
                updLoading("Image is ready to be uploaded to the server");
              } catch (error) {
                updLoading(
                  "Something went wrong. We'll use the image you chose previously."
                );
              }
            }}
          ></input>
        </label>
        <button className="button" type="submit">
          submit
        </button>
        <br />
        <Thumbnail />
        <br />
        <h3>{loading}</h3>
      </form>
    </div>
  );
}

export default Newimage;
