import React, { useEffect, useState } from "react";

function Editor(props) {
  return (
    <div id="controls">
      <label htmlFor="grayscale">
        grayscale
        <input
          name="grayscale"
          id="grayscale"
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
        <input
          name="sepia"
          id="sepia"
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
    </div>
  );
}

export default Editor;
