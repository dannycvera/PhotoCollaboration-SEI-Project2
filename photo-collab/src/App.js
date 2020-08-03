import React from "react";
import Gallery from "./Gallery";
import Collaborator from "./Collaborator";
import { Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Photo Collaberation</h1>
        </Link>
      </header>
      <Route path="/" exact>
        <Gallery />
      </Route>
      <Route path="/:imageID">
        <Collaborator />
      </Route>
    </>
  );
}

export default App;
