import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import SelectZodiacSign from "./components/select-zodiac";
import ZodiacData from "./components/zodiac-data";
import {
  API_HOST,
  API_KEY,
  LOCAL_STORAGE_KEY,
  ZODIAC_SIGNS,
} from "./utils/constants";
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
        } else if (!parsedValue?.zodiacData) {
          fetchZodiacData(parsedValue?.selectedZodiac);
        } else {
          setState((previous) => {
            return {
              ...previous,
              selectedZodiac: parsedValue?.selectedZodiac,
              lastUpdated: dayjs().format("YYYY-MM-DD"),
              status: "complete",
              zodiacData: parsedValue?.zodiacData,
            };
          });
        }
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
      setState((previous) => {
        return {
          ...previous,
          status: "loading",
        };
      });
      const response = await axios.post(
        "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
        {},

        {
          params: { sign: zodiacSign, day: "today" },
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
            zodiacData: response?.data,
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
      <div className="relative z-10 h-100">
        {state?.status === "loading" && (
          <div className="h-screen w-screen flex justify-center items-center text-2xl text-white text-bold flex-col">
            <div className="flex items-center justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>Loading...</div>
          </div>
        )}
        {state?.status === "error" && (
          <div className="h-screen w-screen flex justify-center items-center text-2xl text-white text-bold">
            Something went wrong.
          </div>
        )}
        {state?.status === "complete" && (
          <>
            {state?.selectedZodiac?.length <= 0 ? (
              <SelectZodiacSign fetchZodiacData={fetchZodiacData} />
            ) : (
              <>
                <div
                  className="absolute z-10 right-[30px] top-[20px] border-2 border-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-spacet ease-linear duration-100"
                  onClick={() =>
                    setState((previous) => {
                      return {
                        ...previous,
                        selectedZodiac: "",
                      };
                    })
                  }
                >
                  Select Zodiac Sign
                </div>
                <ZodiacData
                  zodiacData={state?.zodiacData}
                  zodiacSign={ZODIAC_SIGNS?.find(
                    (sign) => sign?.name === state?.selectedZodiac
                  )}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
