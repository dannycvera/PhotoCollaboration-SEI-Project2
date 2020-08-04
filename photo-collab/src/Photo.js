import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styled from "styled-components";

function Photo(props) {
  const StyledImg = styled.img`
    max-width: 325px;
    border: medium solid black;
    margin: 100px 20px 20px 20px;
    filter: sepia(${props.sepia}) grayscale(${props.gray})
      hue-rotate(${props.hue}deg) brightness(${props.bright})
      saturate(${props.satur}) contrast(${props.ctrast});
    @media (min-width: 850px) {
      max-width: 500px;
    }
  `;
  const { imageID } = useParams();
  const [image, updateImage] = useState([]);
  //console.log("sepia", props.sepia);
  //console.log("gray", props.gray);
  //console.log("hue", props.hue);

  useEffect(() => {
    //console.log(imageID);
    const URL = `https://api.airtable.com/v0/appgSipibWEhbQcAf/images/${imageID}`;
    const getImg = async () => {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      //console.log(data.data.fields);
      updateImage(data.data.fields);
    };
    getImg();
  }, []);
  return (
    <>
      <StyledImg
        className="img-edit"
        src={image.url}
        alt={image.title}
      ></StyledImg>
    </>
  );
}

export default Photo;
