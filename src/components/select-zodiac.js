import React, { useState } from "react";
import { ZODIAC_SIGNS } from "../utils/constants";

const SelectZodiacSign = () => {
  const [state, setState] = useState({
    name: "complete",
    selected: "",
  });

  return (
    <div className="min-w-screen flex pb-12 pt-24 flex-col items-center">
      <div>
        <h2 className="text-5xl font-extrabold">Select Zodiac Sign</h2>
      </div>
      <div className="flex flex-wrap">
        {ZODIAC_SIGNS?.map((sign) => (
          <div key={sign} className="">
            {sign}
          </div>
        ))}
      </div>
      <button>Confirm</button>
    </div>
  );
};

export default SelectZodiacSign;
