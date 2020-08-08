import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useSpring, animated } from "react-spring";

function Gallery() {
  // fading in images. not working correctly. will try useTransition later
  // const fade = useSpring({
  //   config: { duration: 600 },
  //   opacity: 1,
  //   from: { opacity: 0 },
  // });
  const [fade, updfade] = useState("");
  const [images, updImages] = useState([]);
  // make axios call from airtable to get list of photos to choose from
  useEffect(() => {
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/images?sort%5B0%5D%5Bfield%5D=created_at&sort%5B0%5D%5Bdirection%5D=desc`;
    const getImgs = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      updImages(data.data.records);
    };
    getImgs();
  }, []);
  // first checks if images data exist. Then checks to see if thumbnails have been generated.
  // Otherwise falls back to full size image.
  return (
    <div className="gallery">
      {images &&
        images.map((image) => {
          let imageURL;
          if (image.fields.imageFile) {
            if (image.fields.imageFile[0].thumbnails) {
              imageURL = image.fields.imageFile[0].thumbnails.large.url;
            } else {
              imageURL = image.fields.imageFile[0].url;
            }
          }

          return (
            <Link to={`/image/${image.id}`} key={image.id}>
              <img
                className={`img-thumbs ${fade}`}
                alt={image.fields.title}
                src={image.fields.imageFile && imageURL}
                onLoad={() => {
                  updfade("opacity-1");
                }}
              ></img>
            </Link>
          );
        })}
    </div>
  );
}

export default Gallery;
