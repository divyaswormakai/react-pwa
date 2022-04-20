import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import SelectZodiacSign from "./components/select-zodiac";
import ZodiacData from "./components/zodiac-data";
import { API_HOST, API_KEY, LOCAL_STORAGE_KEY } from "./utils/constants";
import axios from "axios";
import "./bg.scss";

function App() {
  const [state, setState] = useState({
    status: "loading",
    selectedZodiac: "",
    lastUpdated: dayjs().toDate(),
    zodiacData: {},
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
      if (response?.status === 200) {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({
            selectedZodiac: zodiacSign,
            lastUpdated: dayjs().format("YYYY-MM-DD"),
          })
        );
        setState((previous) => {
          return {
            ...previous,
            selectedZodiac: zodiacSign,
            lastUpdated: dayjs().format("YYYY-MM-DD"),
            status: "complete",
            zodiacData: response?.data,
          };
        });
      } else {
        throw new Error("Could not fetch data");
      }
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
    <div className="App relative text-white min-h-screen min-w-screen">
      <div className="sky h-full w-full bg-gray-400 bg-gradient-to-t from-spaceb to-spacet absolute top-0 z-0">
        <div className="stars"></div>
        <div className="stars1"></div>
        <div className="stars2"></div>
        <div className="shooting-stars"></div>
      </div>
      <div className="relative z-10">
        {state?.status === "loading" && <div>Loading</div>}
        {state?.status === "error" && <div>Error</div>}
        {state?.status === "complete" && (
          <>
            {state?.selectedZodiac?.length <= 0 ? (
              <SelectZodiacSign fetchZodiacData={fetchZodiacData} />
            ) : (
              <ZodiacData />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
