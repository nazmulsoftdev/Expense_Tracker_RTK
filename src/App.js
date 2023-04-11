import React from "react";

import "./App.css";
import Blance from "./components/Blance/Blance";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Blance />
      <Layout />
    </BrowserRouter>
  );
}

export default App;
