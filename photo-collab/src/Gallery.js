import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Gallery() {
  const [images, updateImages] = useState([]);
  useEffect(() => {
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/images`;
    const getImgs = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      console.log(data.data.records);
      updateImages(data.data.records);
    };
    getImgs();
  }, []);

  return (
    <div className="gallery">
      {images &&
        images.map((image) => {
          console.log(image);
          return (
            <Link to={image.id} key={image.id}>
              <img
                className="img-thumbs"
                alt={image.fields.title}
                src={image.fields.url}
              ></img>
            </Link>
          );
        })}
    </div>
  );
}

export default Gallery;
