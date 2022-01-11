import React, { useEffect, useState } from "react";
import { Box, Select, Button, list } from "@chakra-ui/react";

export default function Dropdown(props) {
  return (
    <Select
      variant="filled"
      placeholder="From"
      borderRadius="10px"
      height="34px"
      name="src"
      isDisabled={props.isDisabled}
      onChange={props.changeSrc}
      value={props.selected}
    >
      {props.list}
    </Select>
  );
}
