import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styled from "styled-components";

function Photo(props) {
  const StyledImg = styled.img`
    filter: sepia(${props.sepia}) grayscale(${props.gray});
  `;
  const { imageID } = useParams();
  const [image, updateImage] = useState([]);
  console.log("sepia", props.sepia);
  console.log("gray", props.gray);
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
      <StyledImg
        className="img-edit"
        src={image.url}
        alt={image.title}
      ></StyledImg>
    </>
  );
}

export default Photo;
