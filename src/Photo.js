import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSpring, animated } from "react-spring";

function Photo(props) {
  // The url hosts the imageID to retrieve the choose photo for editing
  const { imageID } = useParams();
  const { post, transClass } = props;

  const [image, updateImage] = useState({});
  const [fade, updfade] = useState(0);
  const opac = useSpring({
    config: { duration: 300 },
    // using a useState var "fade" to start the useSpring fade-in
    opacity: fade,
    from: { opacity: 0 },
  });
  // gets the current image to edit from Airtable
  useEffect(() => {
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/images/${imageID}`;
    const getImg = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      updateImage(data.data.fields);
    };
    getImg();
  }, [imageID]);
  return (
    <animated.div className={`photo-div`} style={opac}>
      <img
        className={`photo ${transClass}`}
        // filters are dynamically applied when you change the slider values using prop variables
        style={{
          filter: `sepia(${post.sepia}) grayscale(${post.grayscale}) hue-rotate(${post.hue}deg) brightness(${post.brightness}) saturate(${post.saturation}) contrast(${post.contrast})`,
        }}
        src={image.imageFile && image.imageFile[0].url}
        onLoad={() => {
          // only starting the animation if the image data has been downloaded from the API
          // using a useState var "fade" to start the useSpring fade-in

          if (image.imageFile) {
            updfade(1);
          }
        }}
        alt={image.title}
      ></img>
    </animated.div>
  );
}

export default Photo;
