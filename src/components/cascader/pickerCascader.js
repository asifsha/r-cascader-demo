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

  const [displayList, setDisplayList] = useState(props.data);

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(undefined);

  const [clickedItem, setClickedItem] = useState({});

  const [children, setChildren] = useState([]);

  const [historyItems, setHistoryItems] = useState([]);

  const selectedKeys = [];

  const togglePicker = () => {
    if (isPickerOpen) {
      setChildren([]);
      setClickedItem({});
      setDisplayList(props.data);
      setHistoryItems([]);
    }
    setIsPickerOpen(!isPickerOpen);
    setShowList(!showList);
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
      let selItem={ key: item.key, text: item.text };
      if (props.onItemSelectd !== undefined) {
        props.onItemSelectd(selItem);
      }
      setSelectedItem(selItem);
      togglePicker();
      return;
    }
    setDisplayList(item.children);
    setClickedItem(item);
    let h = {
      dispalyList: displayList.slice(),
      key: item.key,
      text: item.text
    };

    setHistoryItems([...historyItems, h]);

    console.log("set history");
    console.log(historyItems);
    console.log(h);
    console.log([...historyItems, h]);
    //let result = deepSearch(expandedItems, 'key', (k, t => t.selected === true ));
    //let e= expandedItems[0].children[1].children[2];

    // if(selectedKeys.length>0)
    // {
    //   if(selectedKeys.f)
    // }
  };

  const onHistoryItemClicked = historyItem => {
    setDisplayList(historyItem.dispalyList.slice());

    setClickedItem(historyItem);
    let lastHistory = historyItems;
    let pIndex = findIndexByKey(lastHistory, historyItem.key);

    //let pItem = lastHistory[pIndex];

    lastHistory.length = pIndex;
    console.log("history");
    console.log(lastHistory);
    setHistoryItems(lastHistory);
  };

  const findIndexByKey = (data, key) => {
    //let index = 0;
    // for (index = 0; index < data.length; index++) {
    //   if (data[index].key == key) {
    //     return index;
    //   }
    // }
    return data.findIndex(x => x.key == key);
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
    //console.log(data);
    if (displayList === undefined || displayList.length === 0) return null;
    const listItems = displayList.map((item, i) => {
      console.log(i);
      return (
        <div className="rc-list-card" style={{ display: "flex" }}>
          <div
            key={i}
            value={item.key}
            style={{ verticalAlign: "middle" }}
            onClick={() => {
              onItemClicked(item);
            }}
          >
            {item.text} {item.children !== undefined ? <FaCaretRight /> : null}
          </div>
        </div>
      );
    });
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>{listItems}</div>
        <br />
        <div>{renderHistoryItems()}</div>
      </div>
    );
  };

  const renderHistoryItems = () => {
    return (
      <div style={{display:'flex'}}>
        {historyItems.map((item, i) => {
          return (
            <div
              key={i}
              value={item.key}
              style={styles.historyList}
              onClick={() => {
                onHistoryItemClicked(item);
              }}
            >
              {item.text}{" "}
              {i !== historyItems.length - 1 ? <FaCaretRight /> : null}
            </div>
          );
        })}
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
                  {ch.text}{" "}
                  {ch.children !== undefined ? <FaCaretRight /> : null}
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
    console.log(childItems);
    console.log("render child items");
    return <div style={{ display: "flex" }}>{childItems}</div>;
  };

  useEffect(() => {}, []);

  return (
    <div style={styles.wrapper}>
      <div className="rc-textbox" onClick={() => togglePicker()}>
        {selectedItem !== undefined ? selectedItem.text : props.placeHolder}
        <span
          style={{ verticalAlign: "middle", float: "right", width: "100px" }}
        >
          {showList ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </div>
      <div>
        <div></div>
        {showList && (
          <div className="rc-list" style={styles.list}>
            <div style={styles.inputIcons}>
              <div style={styles.icon}>
                
                <FaSearch />{" "}
              </div>
              <input style={styles.inputField} type="text" />
            </div>            
            {renderItems1(displayList)}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "200px"
  },
  list: {
    border: "1px red solid;",
    display: "flex",
    zIndex: 10,
    position: "absolute",
    display :'flex',
    flexDirection:'column'
  },
  historyList:{
    verticalAlign: "middle",
    fontSize:'x-small'
  },
  inputIcons: {
    marginBottom: "10px"
  },
  icon: {
    padding: "10px",
    minWidth: "40px",
    position: 'absolute'
  },
  inputField: {
    
    padding: "10px",
    textAlign: "center"
  }
};
