import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Photo() {
  const { imageID } = useParams();
  const [image, updateImage] = useState([]);

  useEffect(() => {
    console.log(imageID);
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/images/${imageID}`;
    const getImg = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      console.log(data.data.fields);
      updateImage(data.data.fields);
    };
    getImg();
  }, []);
  return (
    <>
      <img className="img-edit" src={image.url} alt={image.title}></img>
    </>
  );
}

export default Photo;
