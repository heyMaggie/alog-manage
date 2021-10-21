import React from "react";
import { Radio } from "antd";

let RadioGroup = (array, radioChange, styleObj) => {
  return (
    <Radio.Group style={styleObj} onChange={radioChange}>
      {array.map((item, index) => {
        return (
          <Radio key={index} value={item.key}>
            {item.value}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};
export default RadioGroup;
