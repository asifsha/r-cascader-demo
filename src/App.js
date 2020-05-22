import React, { useState } from "react";

import "./App.css";

import PickerCascader from "./components/cascader";

function App() {
  const [country, setCountry] = useState("");

  const [fruit, setFruit] = useState([
    {
      id: 0,
      title: "Apple",
      selected: false,
      key: "fruit"
    },
    {
      id: 1,
      title: "Orange",
      selected: false,
      key: "fruit"
    },
    {
      id: 2,
      title: "Grape",
      selected: false,
      key: "fruit"
    },
    {
      id: 3,
      title: "Pomegranate",
      selected: false,
      key: "fruit"
    },
    {
      id: 4,
      title: "Strawberry",
      selected: false,
      key: "fruit"
    }
  ]);

  const resetThenSet = (id, key) => {
    console.log(id);
    console.log(key);
    console.log(JSON.stringify(fruit));
    let temp = JSON.parse(JSON.stringify(fruit));
    console.log(temp);
    temp.forEach(item => (item.selected = false));
    temp[id].selected = true;
    setFruit(temp);
    console.log(temp);
  };

  return (
    <div>
      <PickerCascader
       style={{width:'15rem'}}
        placeHolder="City"
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
        onValueSelected={item => setCountry(item)}
      />
      <div>text show behind the card</div>
      <div className="wrapper">
        {/* <Dropdown
            title="Select fruit"
            list={fruit}
            resetThenSet={resetThenSet}
          /> */}
      </div>
    </div>
  );
}

export default App;
