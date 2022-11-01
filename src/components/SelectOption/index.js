import React from "react";
import { Select } from "antd";

let SelectOption = (array, attrObj = {}) => {
    let placeholder = "请选择";
    if (attrObj.hasOwnProperty("placeholder")) {
        placeholder = attrObj.placeholder;
    }
    // let style = null;
    // if (attrObj.hasOwnProperty("style")) {
    //     style = attrObj.style;
    // }
    let { style = {}, ...rest } = attrObj;
    // if (!style.hasOwnProperty("width")) {
    //     style.width = 190;
    // }
    style.width = 190;
    return (
        <Select style={style} placeholder={placeholder} {...rest}>
            {array.map((item, index) => {
                return (
                    <Select.Option key={index} value={item.key}>
                        {item.value}
                    </Select.Option>
                );
            })}
        </Select>
    );
};
export default SelectOption;
