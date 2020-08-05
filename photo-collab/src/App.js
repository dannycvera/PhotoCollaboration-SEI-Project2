import React from "react";
import Gallery from "./Gallery";
import Collaborator from "./Collaborator";
import Newimage from "./Newimage";
import { Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h2>Photo Co-lab</h2>
        </Link>
        <Link to="/newimage">
          <p>(new image)</p>
        </Link>
      </header>

      <Route path="/" exact>
        <Gallery />
      </Route>
      <Route path="/newimage" exact>
        <Newimage />
      </Route>
      <Route path="/image/:imageID" exact>
        <Collaborator />
      </Route>
    </>
  );
}

export default App;
