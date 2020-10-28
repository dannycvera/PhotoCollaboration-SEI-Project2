import React, { useState } from "react";
import axios from "axios";

// geting imageID from the URL.
// Use the imageID to cross reference the images with userEdits related to that image

function Editor(props) {
  const { post, updPost, updPosts, handleChange, handleTextChange } = props;
  const [emailColor, updEmailColor] = useState("");
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailColor === "lightBlue") {
      const URL = "https://api.airtable.com/v0/appgSipibWEhbQcAf/userEdits";
      console.log(post);
      try {
        // updates the airtable userEdits table with photo filter edits and their notes
        const resData = await axios.post(
          URL,
          {
            fields: post,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
            },
          }
        );
        updPosts((prevState) => [...prevState, resData.data]);
        updPost({ ...post, notes: "" });
      } catch (error) {
        console.error(error);
      }
    } else {
      let originalEmailColor = emailColor;
      updEmailColor("red");
      setTimeout(() => updEmailColor(originalEmailColor), 1200);
    }
  };
  // resets the values to default and adds the transition CSS class
  const reset = (e) => {
    e.preventDefault();
    updPost({
      grayscale: 0,
      sepia: 0,
      hue: 0,
      brightness: 1,
      contrast: 1,
      saturation: 1,
      user_email: "",
      notes: "",
    });
  };
  // email vaildation
  const checkEmail = (e) => {
    handleTextChange(e);
    regexEmail.test(e.target.value)
      ? updEmailColor("lightBlue")
      : updEmailColor("pink");
  };
  // sliders for each photo filter
  // trying out the react-slider to display the current position inside the thumb.
  return (
    <div className="photo-editor">
      <div className="controls">
        <label htmlFor="grayscale">
          grayscale {Number(post.grayscale).toFixed(2)}
          <br />
          <input
            name="grayscale"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={post.grayscale}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="sepia">
          sepia {Number(post.sepia).toFixed(2)}
          <br />
          <input
            name="sepia"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={post.sepia}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="hue">
          hue {post.hue}
          <br />
          <input
            name="hue"
            type="range"
            min={0}
            max={360}
            step={1}
            value={post.hue}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="brightness">
          brightness {Number(post.brightness).toFixed(2)}
          <br />
          <input
            name="brightness"
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={post.brightness}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="contrast">
          contrast {Number(post.contrast).toFixed(2)}
          <br />
          <input
            name="contrast"
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={post.contrast}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="saturation">
          saturation {Number(post.saturation).toFixed(2)}
          <br />
          <input
            name="saturation"
            type="range"
            min="0"
            max="3"
            step="0.05"
            value={post.saturation}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ marginTop: "8px" }}>
        <input
          name="user_email"
          type="email"
          placeholder="email"
          value={post.user_email}
          style={{
            backgroundColor: emailColor,
          }}
          onChange={checkEmail}
        />
        <br />
        <textarea
          name="notes"
          placeholder="notes"
          value={post.notes}
          onChange={handleTextChange}
        />
        <br />
        <div
          // make sure the buttons are both horzontally next to each other
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "no-wrap",
          }}
        >
          <button className="button" onClick={handleSubmit}>
            submit
          </button>
          <button className="button" onClick={reset}>
            reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
