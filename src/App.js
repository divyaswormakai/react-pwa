import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import SelectZodiacSign from "./components/select-zodiac";
import ZodiacData from "./components/zodiac-data";
import { API_HOST, API_KEY, LOCAL_STORAGE_KEY } from "./utils/constants";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    status: "loading",
    selectedZodiac: "",
    lastUpdated: dayjs().toDate(),
  });

  useEffect(() => {
    const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedValue?.length) {
      const parsedValue = JSON.parse(savedValue);
      if (parsedValue?.selectedZodiac?.length > 0) {
        if (dayjs().subtract(dayjs(parsedValue?.lastUpdated), "day") > 0) {
          fetchZodiacData(parsedValue?.selectedZodiac);
        }

        fetchZodiacData();
      }
    } else {
      setState({
        status: "complete",
        selectedZodiac: "",
        lastUpdated: dayjs().toDate(),
      });
    }
  }, []);

  const fetchZodiacData = async (zodiacSign) => {
    try {
      const response = await axios.post(
        "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
        {},
        { params: { sign: zodiacSign, day: "today" } },
        {
          headers: {
            "X-RapidAPI-Host": API_HOST,
            "X-RapidAPI-Key": API_KEY,
          },
        }
      );
      console.log(response);
      setState((previous) => {
        return {
          ...previous,
          selectedZodiac: zodiacSign,
          lastUpdated: dayjs().format("YYYY-MM-DD"),
          status: "complete",
        };
      });
    } catch (error) {
      setState((previous) => {
        return {
          ...previous,
          selectedZodiac: zodiacSign,
          lastUpdated: dayjs().format("YYYY-MM-DD"),
          status: "error",
        };
      });
    }
  };

  return (
    <div className="App">
      {state?.status === "loading" && <div>Loading</div>}
      {state?.status === "error" && <div>Error</div>}
      {state?.status === "complete" && (
        <>
          {state?.selectedZodiac?.length <= 0 ? (
            <SelectZodiacSign />
          ) : (
            <ZodiacData />
          )}
        </>
      )}
    </div>
  );
}

export default App;
