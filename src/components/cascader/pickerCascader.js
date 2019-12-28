import React, { useState } from "react";
import Modal from "react-modal";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

import "./pickerCascader.css";

export function PickerCascader(props)  {
  
  console.log(props);
  const [selectedValue, setSelectedValue] = useState([]);
  

  const openDropDown = ()=>{

  };

  
    return (      
      <div>            
        <div className="cascader">
          <span className="fa fa-caret-down"></span>
          <input placeholder={props.placeHolder} onFocus={() => openDropDown()}/>
        </div>
      </div>
    );
  }

