import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSpring, animated } from "react-spring";

function Gallery() {
  const [fade, updfade] = useState(0);
  const opac = useSpring({
    config: { duration: 400 },
    // using a useState var "fade" to start the useSpring fade-in
    opacity: fade,
    from: { opacity: 0 },
  });

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
    <animated.div
      className={`gallery`}
      style={opac}
      onLoad={() => {
        // only starting the animation if the images data has been downloaded from the API
        // using a useState var "fade" to start the useSpring fade-in
        if (images[0].fields) {
          updfade(1);
        }
      }}
    >
      {/* only running the .map loop if the images data exists.  */}
      {images &&
        images.map((image) => {
          let imageURL;
          if (image.fields.imageFile) {
            // checking if the server generated the thumbnails yet.
            // It can be slow after uploading a new image
            if (image.fields.imageFile[0].thumbnails) {
              imageURL = image.fields.imageFile[0].thumbnails.large.url;
            } else {
              imageURL = image.fields.imageFile[0].url;
            }
            return (
              <Link to={`/image/${image.id}`} key={image.id}>
                <img
                  className="img-thumbs"
                  alt={image.fields.title}
                  src={image.fields.imageFile && imageURL}
                ></img>
              </Link>
            );
          }
        })}
    </animated.div>
  );
}

export default Gallery;
