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
          <h2>Photo Co-Lab</h2>
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
      <footer>
        <div className="social-bar">
          <a
            href="https://github.com/dannycvera"
            className="github"
            target="_blank"
          >
            <img
              className="github-icon"
              src={require("./img/GitHub-logo-32px.png")}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-vera-65bbb07/"
            className="linkedin"
            target="_blank"
          >
            <img
              className="linkedin-icon"
              src={require("./img/linkedIn-logo.png")}
            />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
