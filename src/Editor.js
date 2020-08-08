import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

// geting imageID from the URL.
// Use the imageID to cross reference the images with userEdits related to that image

function Editor(props) {
  const { imageID } = useParams();
  const [emailColor, updEmailColor] = useState("");
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailColor === "lightBlue") {
      const URL = "https://api.airtable.com/v0/appgSipibWEhbQcAf/userEdits";

      try {
        // updates the airtable userEdits table with photo filter edits and their notes
        await axios.post(
          URL,
          {
            fields: {
              user_email: props.email,
              imageID: imageID,
              notes: props.notes,
              contrast: Number(props.ctrast),
              brightness: Number(props.bright),
              grayscale: Number(props.gray),
              hue: Number(props.hue),
              saturation: Number(props.satur),
              sepia: Number(props.sepia),
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
            },
          }
        );
        props.updNewPost(!props.newPost);
        props.updNotes("");
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
    props.updNotes("");
    props.updCtrast(1);
    props.updBright(1);
    props.updSatur(1);
    props.updGray(0);
    props.updHue(0);
    props.updSepia(0);
    props.updDisplayPost({});
    props.updTransClass("transition");
  };
  // email vaildation
  const checkEmail = (e) => {
    props.updEmail(e.target.value);
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
          grayscale {Number(props.gray).toFixed(2)}
          <br />
          <input
            name="grayscale"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={props.gray}
            onChange={(e) => {
              props.updGray(e.target.value);
            }}
          />
        </label>

        <label htmlFor="sepia">
          sepia {Number(props.sepia).toFixed(2)}
          <br />
          <input
            name="sepia"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={props.sepia}
            onChange={(e) => {
              props.updSepia(e.target.value);
            }}
          />
        </label>

        <label htmlFor="hue">
          hue {props.hue}
          <br />
          <input
            name="hue"
            type="range"
            min="0"
            max="360"
            step="1"
            value={props.hue}
            onChange={(e) => {
              props.updHue(e.target.value);
            }}
          />
        </label>
        <label htmlFor="brightness">
          brightness {Number(props.bright).toFixed(2)}
          <br />
          <input
            name="brightness"
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={props.bright}
            onChange={(e) => {
              props.updBright(e.target.value);
            }}
          />
        </label>
        <label htmlFor="contrast">
          contrast {Number(props.ctrast).toFixed(2)}
          <br />
          <input
            name="contrast"
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={props.ctrast}
            onChange={(e) => {
              props.updCtrast(e.target.value);
            }}
          />
        </label>
        <label htmlFor="saturate">
          saturate {Number(props.satur).toFixed(2)}
          <br />
          <input
            name="saturate"
            type="range"
            min="0"
            max="3"
            step="0.05"
            value={props.satur}
            onChange={(e) => {
              props.updSatur(e.target.value);
            }}
          />
        </label>
      </div>
      <div style={{ marginTop: "8px" }}>
        <input
          type="email"
          placeholder="email"
          value={props.email}
          onChange={checkEmail}
          style={{
            backgroundColor: emailColor,
          }}
        />
        <br />
        <input
          type="text"
          placeholder="notes"
          value={props.notes}
          onChange={(e) => {
            props.updNotes(e.target.value);
          }}
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
