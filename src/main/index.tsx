import React, { useState, useRef } from "react";
import styled from "styled-components";

import { getWordBank } from "../utils";

export function Main() {
  // put wordBank in a ref so we don't re-randomize the list on every render
  const wordBank = useRef(getWordBank());

  return <div />;
}
