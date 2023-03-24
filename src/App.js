import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "./Components/homecomponent.js";
import NavbarComponent from "./Components/navbar";

function App() {

  return (
    <BrowserRouter>
      <div id="app" className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;