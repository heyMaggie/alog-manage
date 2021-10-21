import React from "react";
import { Checkbox } from "antd";

let CheckboxGroup = (array, styleObj) => {
  return (
    <Checkbox.Group style={styleObj}>
      {array.map((item, index) => {
        return (
          <Checkbox key={index} value={item.value}>
            {item.text}
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};
export default CheckboxGroup;
