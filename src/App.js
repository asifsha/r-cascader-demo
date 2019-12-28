import React from "react";
import logo from "./logo.svg";
import "./App.css";

import PickerCascader from "./components/cascader";

function App() {
  return (
    <div className="App">
     
      <PickerCascader placeHolder="City" />
    </div>
  );
}

export default App;
