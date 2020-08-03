import React, { useEffect, useState } from "react";

function Editor(props) {
  return (
    <div>
      <label htmlFor="grayscale">
        grayscale
        <br />
        <input
          name="grayscale"
          id="grayscale"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={props.grayscale}
          onChange={(e) => {
            props.updateGrayscale(e.target.value);
          }}
        />
      </label>
    </div>
  );
}

export default Editor;
