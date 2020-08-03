import React, { useEffect, useState } from "react";

function Editor(props) {
  return (
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
          max="3"
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
          max="3"
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
  );
}

export default Editor;
