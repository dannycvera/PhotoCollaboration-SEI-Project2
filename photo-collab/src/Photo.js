import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSpring, animated } from "react-spring";
//import styled from "styled-components";
//import { useTransition, animated } from "react-spring";

function Photo(props) {
  // Styled components can go to hell!!!
  // It completely breaks my app for IOS devices.
  // Better to just inline style with variables.
  // const StyledImg = styled.img`
  //   filter: sepia(${props.sepia}) grayscale(${props.gray})
  //     hue-rotate(${props.hue}deg) brightness(${props.bright})
  //     saturate(${props.satur}) contrast(${props.ctrast});
  // `;
  const { imageID } = useParams();
  const [image, updateImage] = useState([]);
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/images/${imageID}`;
    const getImg = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      console.log("get photo from images table", data.data.fields);
      updateImage(data.data.fields);
    };
    getImg();
  }, []);
  return (
    <div className="photo-div">
      <animated.img
        style={fade}
        style={{
          filter: `sepia(${props.sepia}) grayscale(${props.gray}) hue-rotate(${props.hue}deg) brightness(${props.bright}) saturate(${props.satur}) contrast(${props.ctrast})`,
        }}
        className="photo"
        src={image.imageFile && image.imageFile[0].url}
        alt={image.title}
      ></animated.img>
    </div>
  );
}

export default Photo;
