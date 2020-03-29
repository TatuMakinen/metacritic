import React from "react";
import { Select, MenuItem } from "@material-ui/core";

interface PlatformSelectProps {
  values: string[];
  value: string;
  setValue: React.Dispatch<string>;
}

const PlatformSelect: React.FC<PlatformSelectProps> = ({
  values,
  value,
  setValue
}) => {
  return (
    <div className="PlatformSelectContainer">
      <Select
        className="PlatformSelect"
        value={value}
        onChange={event => setValue(event.target.value as string)}
      >
        {addMenuItems(values)}
      </Select>
    </div>
  );
};

export default PlatformSelect;

function addMenuItems(itemsAsStrings: string[]) {
  var items = [];
  for (let item of itemsAsStrings) {
    items.push(
      <MenuItem key={"MenuItem-" + item} value={item}>
        {item}
      </MenuItem>
    );
  }
  return items;
}
