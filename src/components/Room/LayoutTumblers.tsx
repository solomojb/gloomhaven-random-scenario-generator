import React from "react";
import { useSizeProvider } from "../Providers/SizeProvider";
import OffsetTumblers from "../Tabs/Maps/Editor/OffsetTumblers";

const LayoutTumblers = () => {
    const {size, setSize} = useSizeProvider();
  return <OffsetTumblers label="Layout Offsets" initialPoint={size} onChanged={setSize} step={0.1}/>
};

export default LayoutTumblers;
