import React, { useState } from "react";
import dayjs from "dayjs";
import SelectZodiacSign from "./components/select-zodiac";
import ZodiacData from "./components/zodiac-data";
function App() {
  const [state, setState] = useState({
    selectedZodiac: "",
    zodiacDetails: {},
    lastUpdated: dayjs().toDate(),
  });
  return (
    <div className="App">
      {state?.selectedZodiac?.length <= 0 ? (
        <SelectZodiacSign />
      ) : (
        <ZodiacData />
      )}
    </div>
  );
}

export default App;
