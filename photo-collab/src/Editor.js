import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Editor(props) {
  const { imageID } = useParams();
  // useEffect(() => {

  // });
  const handleSubmit = async (e) => {
    const URL = "https://api.airtable.com/v0/appgSipibWEhbQcAf/userEdits";
    e.preventDefault();
    try {
      const post = await axios.post(
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
            saturate: Number(props.satur),
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
  };
  return (
    <div>
      <div id="controls">
        <label htmlFor="grayscale">
          grayscale
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
          sepia
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
          hue
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
          brightness
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
          contrast
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
          saturate
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
      <div>
        <input
          type="email"
          placeholder="email"
          value={props.email}
          onChange={(e) => {
            props.updEmail(e.target.value);
          }}
        />
        <input
          type="text"
          size="38"
          placeholder="notes"
          value={props.notes}
          onChange={(e) => {
            props.updNotes(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>submit changes</button>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          clear changes
        </button>
      </div>
    </div>
  );
}

export default Editor;
