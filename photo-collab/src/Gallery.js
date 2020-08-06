import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSpring, animated } from "react-spring";

function Gallery() {
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [images, updateImages] = useState([]);
  useEffect(() => {
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/images?sort%5B0%5D%5Bfield%5D=created_at&sort%5B0%5D%5Bdirection%5D=desc`;
    const getImgs = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      //console.log(data.data.records);
      updateImages(data.data.records);
    };
    getImgs();
  }, []);

  return (
    <div className="gallery">
      {images &&
        images.map((image) => {
          console.log("images", image);
          return (
            <Link to={`/image/${image.id}`} key={image.id}>
              <img
                style={fade}
                className="img-thumbs"
                alt={image.fields.title}
                src={image.fields.imageFile && image.fields.imageFile[0].url}
              ></img>
            </Link>
          );
        })}
    </div>
  );
}

export default Gallery;
