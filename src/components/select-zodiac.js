import React, { useState } from "react";
import { ZODIAC_SIGNS } from "../utils/constants";

const SelectZodiacSign = ({ fetchZodiacData }) => {
  const [selectedSign, setSelectedSign] = useState("");

  return (
    <div className="min-w-screen flex pb-12 pt-12 flex-col items-center">
      <div>
        <h2 className="text-5xl font-extrabold px-6">Select Zodiac Sign</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-8 mt-12">
        {ZODIAC_SIGNS?.map((sign) => (
          <div
            className="group box-border relative overflow-hidden w-full mx-auto bg-transparent p-8 text-center aspect-square border-2 border-white cursor-pointer "
            key={sign?.name}
            onClick={() => setSelectedSign(sign?.name)}
          >
            <div
              className={`absolute z-1 w-full h-full bg-white left-0  ease-linear duration-150 ${
                sign?.name === selectedSign
                  ? "top-0"
                  : "top-full group-hover:top-0"
              }`}
            />
            <div
              className={`relative z-20  font-bold flex flex-col justify-center items-center h-full ease-linear duration-100 ${
                sign?.name === selectedSign
                  ? "scale-150 text-black"
                  : "group-hover:scale-150 group-hover:text-black"
              }`}
            >
              <div className="text-4xl">{sign.icon}</div>
              <div>{sign?.name}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <button
          className="bg-white px-12 py-4 text-spaceb rounded-lg  border-2 border-white disabled:bg-transparent disabled:text-white"
          disabled={selectedSign?.length <= 0}
          onClick={() => fetchZodiacData(selectedSign)}
        >
          Confirm & Save
        </button>
      </div>
    </div>
  );
};

export default SelectZodiacSign;
