import React from "react";

const ZodiacData = ({ zodiacData, zodiacSign }) => {
  return (
    <div className="min-h-screen h-full w-full flex justify-center items-center flex-col px-8 pt-32 sm:pt-0">
      <div className="text-8xl ">{zodiacSign?.icon}</div>
      <div className="text-4xl text-center font-extrabold my-4">
        {zodiacSign?.name}
      </div>

      <div className="my-4 text-center">
        <div className="text-4xl">{zodiacData?.current_date}</div>
      </div>

      <div className="my-4 text-center">
        <div>Lucky Number</div>
        <div className="text-4xl">{zodiacData?.lucky_number}</div>
      </div>

      <div className="my-4 text-center max-w-xl ">
        <div className="text-xl">{zodiacData?.description}</div>
      </div>
    </div>
  );
};

export default ZodiacData;
