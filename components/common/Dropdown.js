import React, { useEffect, useState } from "react";
import { Box, Select, Button, list } from "@chakra-ui/react";

export default function Dropdown(props) {
  const [selected, setSelected] = useState(null);
  setSelected(
    props.list.map((mp) => (
      <options key={mp.id} value={mp.id}>
        {mp.title}
      </options>
    ))
  );
  console.log(props.list);
  return (
    <Select
      variant="filled"
      placeholder="From"
      borderRadius="10px"
      height="34px"
      name="src"
      isDisabled={props.isDisabled}
      onChange={props.changeSrc}
    >
      {selected}
    </Select>
  );
}
