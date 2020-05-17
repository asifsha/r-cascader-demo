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

  const [selectedItems, setSelectedItems] = useState([]);

  const [clickedItem, setClickedItem] = useState({});

  const [historyItems, setHistoryItems] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [transformData, setTransformData] = useState([]);

  const [searchData, setSearchData] = useState([]);

  const [filterData, setFilterData] = useState([]);

  const togglePicker = () => {
    if (isPickerOpen) {
      setClickedItem({});
      setDisplayList(props.data);
      setHistoryItems([]);
    }
    setIsPickerOpen(!isPickerOpen);
    setShowList(!showList);
  };

  const createSearchData = (searchData, data, key, text) => {
    let index = 0;
    for (index = 0; index < data.length; index++) {
      let d = data[index];
      if (d.children !== undefined)
        createSearchData(
          searchData,
          d.children,
          key + d.key + "~",
          text + d.text + " | "
        );
      else {
        let k = key + d.key;
        let t = text + d.text;
        searchData.push({ key: k, text: t });
      }
    }
  };

  const onItemClicked = item => {
    console.log("on item clicked");
    console.log(item);
    if (
      item.children === undefined ||
      item.children === null ||
      item.children.length === 0
    ) {
      let index = 0;
      let t = "",
        k = "";

      for (index = 0; index < selectedItems.length; index++) {
        t = t + selectedItems[index].text + " | ";
        k = k + selectedItems[index].key + "~";
      }
      let si = { text: "", key: "" };
      si.text = t + item.text;
      si.key = k + item.key;

      if (props.onValueSelected !== undefined) {
        props.onValueSelected(si);
      }
      setSelectedItem(si);
      togglePicker();
      return;
    }
    setDisplayList(item.children);
    setClickedItem(item);
    var lastselectedItems = selectedItems.slice();
    let h = {
      selectedItems: selectedItems.slice(),
      dispalyList: displayList.slice(),
      key: item.key,
      text: item.text
    };
    lastselectedItems.push(item);
    setSelectedItems(lastselectedItems.slice());

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
    return (
      <div>
        {(searchValue === undefined || searchValue === "") && renderDataItems()}
        {searchValue !== "" && renderSearchItems()}
      </div>
    );
  };

  const renderSearchItems = () => {
    console.log("render search");
    if (searchValue === undefined) return null;
    console.log(searchValue);
    console.log(searchData);
    console.log(filterData);
    const searcItems = filterData.map((item, i) => {
      console.log(i);
      return (
        <div className="rc-list-card" style={{ display: "flex" }}>
          <div
            key={i}
            value={item.key}
            style={{ verticalAlign: "middle" }}
            onClick={() => {
              onSearchItemClicked(item);
            }}
          >
            {item.text}
          </div>
        </div>
      );
    });
    return <div>{searcItems}</div>;
  };

  const renderDataItems = () => {
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
      <div style={{ display: "flex" }}>
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

  useEffect(() => {
    let td = [];
    createSearchData(td, props.data, "", "");
    setTransformData(td.slice());
    setSearchData(td.slice());
    console.log(td);
  }, []);

  const onSearchItemClicked = item => {
    let si = { text: "", key: "" };
    si.text = item.text;
    si.key = item.key;
    setSelectedItem(si);
    togglePicker();
    if (props.onValueSelected != null) {
      props.onValueSelected(si);
    }
  };

  const handleSearch = event => {
    //console.log("A name was submitted: " + event);
    //console.log(event);
    let searchString = event.target.value;
    setSearchValue(searchString);
    console.log(searchValue);
    event.preventDefault();
    let sd = searchData.slice();
    sd = sd.filter(arr => {
      return arr.text.toLowerCase().includes(searchString.toLowerCase());
    });

    setFilterData(sd);
    console.log(sd);
  };

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
              <input
                style={styles.inputField}
                type="text"
                value={searchValue}
                onChange={evt => handleSearch(evt)}
              />
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
    border: "1px red solid",
    display: "flex",
    zIndex: 10,
    position: "absolute",
    flexDirection: "column"
  },
  historyList: {
    verticalAlign: "middle",
    fontSize: "x-small"
  },
  inputIcons: {
    marginBottom: "10px"
  },
  icon: {
    padding: "10px",
    minWidth: "40px",
    position: "absolute",
    color: "grey"
  },
  inputField: {
    padding: "10px",

    paddingLeft: "30px"
  }
};
