import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styled from "styled-components";
//import { useTransition, animated } from "react-spring";

function Photo(props) {
  const StyledImg = styled.img`
    filter: sepia(${props.sepia}) grayscale(${props.gray})
      hue-rotate(${props.hue}deg) brightness(${props.bright})
      saturate(${props.satur}) contrast(${props.ctrast});
  `;
  const { imageID } = useParams();
  const [image, updateImage] = useState([]);

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
  }, []);
  return (
    <div className="photo-div">
      <StyledImg
        className="photo"
        src={image.url}
        alt={image.title}
      ></StyledImg>
    </div>
  );
}

export default Photo;
