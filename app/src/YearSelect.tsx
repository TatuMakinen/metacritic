import React from "react";
import { Select, MenuItem } from "@material-ui/core";

interface YearSelectProps {
  values: number[];
  value: number;
  setValue: React.Dispatch<number>;
}

const YearSelect: React.FC<YearSelectProps> = ({ values, value, setValue }) => {
  return (
    <div className="YearSelectContainer">
      <Select
        value={value}
        onChange={event => setValue(event.target.value as number)}
      >
        {addMenuItems(values)}
      </Select>
    </div>
  );
};

export default YearSelect;

function addMenuItems(itemsAsNumbers: number[]) {
  var items = [];
  for (let item of itemsAsNumbers) {
    items.push(
      <MenuItem key={"MenuItem-" + item} value={item}>
        {item}
      </MenuItem>
    );
  }
  return items;
}
