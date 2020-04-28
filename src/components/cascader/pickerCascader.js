import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaCaretDown, FaCaretRight, FaCaretUp, FaSearch } from "react-icons/fa";
import FontAwesome from "react-fontawesome";

import "./pickerCascader.css";

const customStyles = {
  content: {
    top: "10%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export function PickerCascader(props) {
  //const [selectedValue, setSelectedValue] = useState([]);
  //const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log(props);
  // const openDropDown = () => {
  //   setModalIsOpen(true);
  // };

  const [showList, setShowList] = useState(false);

  const [showItem, setShowItem] = useState(false);

  //const [originalData, setOriginalData] = useState(props.data);

  const [data, setData] = useState(props.data);

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState([]);

  const [clickedItem, setClickedItem] = useState({});

  const [children, setChildren] = useState([]);
  //const [expandedItems, setExpandedItems] = useState(props.data);

  const selectedKeys = [];

  const togglePicker = () => {
    if (isPickerOpen) {
    }
    setIsPickerOpen(!isPickerOpen);
    setShowList(!showList);

    //setData((originalData));
    //console.log(originalData);
    //setExpandedItems(originalData);
  };

  const processData = source => {
    addLevel(source);
    return source;
  };

  const addLevel = (arr, level = 0) => {
    arr.forEach(obj => {
      obj.level = level;
      if (obj.children !== undefined) addLevel(obj.children, level + 1);
    });
  };

  //   const getLevel1 = originalData=>{
  //     let arr=[];
  //     originalData.foreach( d =>{
  // arr.push({key : d.key, text: d.text, hasChild: d.children !==undefined && d.children.length > 0});

  //     } );

  // return arr;
  //   };

  const renderItems = data => {
    return data.map((item, i) => {
      return (
        <ul
          key={i}
          value={item.key}
          style={{ verticalAlign: "middle" }}
          onClick={() => {
            setClickedItem(item);
          }}
        >
          {item.text} {item.children !== null ? <FaCaretRight /> : null}
        </ul>
      );
    });
  };

  const renderChildItems = item => {
    if (item === undefined || item.children === undefined) return null;
    return item.children.map((child, i) => {
      return (
        <ul key={i} value={child.key} style={{ verticalAlign: "middle" }}>
          {child.text} {child.children !== null ? <FaCaretRight /> : null}
        </ul>
      );
    });
  };

  const onItemClicked = item => {
    console.log("on item clicked");
    console.log(item);
    if (
      item.children === undefined ||
      item.children === null ||
      item.children.length === 0
    ) {
      if (props.onItemSelectd !== undefined) {
        props.onItemSelectd({ key: item.key, text: item.text });
      }
      return;
    }
    if (clickedItem === undefined) {
      search(data, item.key, true);
      setClickedItem(item);
    } else {
      search(data, clickedItem.key, false);
      search(data, item.key, true);
      setClickedItem(item);
    }
    setChildren([...children, item]);

    //let result = deepSearch(expandedItems, 'key', (k, t => t.selected === true ));
    //let e= expandedItems[0].children[1].children[2];

    // if(selectedKeys.length>0)
    // {
    //   if(selectedKeys.f)
    // }
  };

  const search = (data, key, selected) => {
    searchItem(data, key, selected);
  };

  const searchItem = (arr, key, selected) => {
    arr.forEach(obj => {
      if (obj.key === key) {
        obj.selected = selected;
      }
      if (obj.children !== undefined) searchItem(obj.children, key, selected);
    });
  };

  const renderItems1 = () => {
    console.log("render1");
    console.log(data);
    if (data === undefined || data.length === 0) return null;
    const listItems = data.map((item, i) => {
      return (
        <div className="rc-list-card" style={{display:'flex'}}>
          
            <li
              key={i}
              value={item.key}
              style={{ verticalAlign: "middle" }}
              onClick={() => {
                onItemClicked(item);
              }}
            >
              {item.text} {item.children !== null ? <FaCaretRight /> : null}
            </li>
          
        </div>
      );
    });
    return (
      <div style={{display:'flex'}}>
        <div>
          <ul>{listItems}</ul>
        </div>
        <div style={{ backgroundColor: "green", display:'flex' }}>
          <div>test 222</div>
          {renderChildItems1()}
        </div>
      </div>
    );
  };

  const renderChildItems1 = () => {
    console.log(children);
    if (children.length === 0) return null;
    console.log("render child121");
    const childItems = children.map((child, i) => {
      console.log("first child");
      console.log(child);
      return (
        <div>
          <ul>
            {child.children.map((ch, i) => {
              console.log("second child");
              console.log(ch);
              return (
                <li
                  key={i}
                  value={ch.key}
                  style={{ verticalAlign: "middle" }}
                  onClick={() => {
                    onItemClicked(ch);
                  }}
                >

                  {ch.text} {ch.children !== null ? <FaCaretRight /> : null}
                  
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
    console.log(childItems);
    console.log("render child items");
    return <div style={{display:'flex'}}>{childItems}</div>;
  };

  useEffect(() => {}, []);

  return (
    <div className="rc-wrapper">
      <div className="rc-textbox" onClick={() => togglePicker()}>
        {props.placeHolder}
        <span
          style={{ verticalAlign: "middle", float: "right", width: "100px" }}
        >
          {showList ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </div>
      <div
        className="rc-list"
        style={{
          display: "flex",
          zIndex: 10,
          position: "absolute",
          backgroundColor: "orange"
        }}
      >
        {showList && renderItems1(data)}
      </div>
    </div>
  );
}
