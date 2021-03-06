import React, { useState } from "react";

import "./App.css";


import PickerCascader  from "r-picker-cascader";

function App() {
  const [city, setCity] = useState({});

  return (
    <div>
      <div style={{ padding: "2rem", display: "flex" }}>
        <div style={{ paddingRight: "1rem" }}>Select City : </div>
        <div style={{}}>
          <PickerCascader
            style={{ width: "15rem" }}
            placeHolder={"City"}
            data={[
              {
                key: "1",
                text: "Australia",
                children: [
                  {
                    key: "2",
                    text: "New South Wales",
                    children: [
                      { key: "3", text: "Sydney" },
                      { key: "4", text: "Wollongong" }
                    ]
                  },
                  {
                    key: "5",
                    text: "Victoria",
                    children: [
                      { key: "6", text: "Melbourne" },
                      { key: "7", text: "Geelong" }
                    ]
                  }
                ]
              },
              {
                key: "10",
                text: "Canada",
                children: [
                  {
                    key: "11",
                    text: "Alberta",
                    children: [
                      { key: "12", text: "Calgary" },
                      { key: "13", text: "Brooks" }
                    ]
                  },
                  {
                    key: "14",
                    text: "British Columbia",
                    children: [
                      { key: "15", text: "Vancouver" },
                      { key: "16", text: "Vernon" }
                    ]
                  }
                ]
              },
              {
                key: "20",
                text: "United States",
                children: [
                  {
                    key: "21",
                    text: "New York",
                    children: [
                      { key: "22", text: "Albany" },
                      { key: "23", text: "Norwich" }
                    ]
                  },
                  {
                    key: "24",
                    text: "Pennsylvania",
                    children: [
                      { key: "25", text: "Farrell" },
                      { key: "26", text: "Parker" }
                    ]
                  }
                ]
              }
            ]}
            onValueSelected={item => setCity(item)}
          />
        </div>
      </div>
      <div style={{padding:'1rem'}}>
        <div>Selected Value: {city.text}</div>
        <div>Selected Key: {city.key}</div>
      </div>
    </div>
  );
}

export default App;
