import {
  GiAries,
  GiTaurus,
  GiGemini,
  GiCancer,
  GiLeo,
  GiVirgo,
  GiLibra,
  GiScorpio,
  GiSagittarius,
  GiCapricorn,
  GiAquarius,
  GiPisces,
} from "react-icons/gi";

export const LOCAL_STORAGE_KEY = "ZODIAC_SIGN";

export const API_HOST = process.env.REACT_APP_API_HOST;

export const API_KEY = process.env.REACT_APP_API_KEY;

export const ZODIAC_SIGNS = [
  { name: "Aries", icon: <GiAries /> },
  { name: "Taurus", icon: <GiTaurus /> },
  { name: "Gemini", icon: <GiGemini /> },
  { name: "Cancer", icon: <GiCancer /> },
  { name: "Leo", icon: <GiLeo /> },
  { name: "Virgo", icon: <GiVirgo /> },
  { name: "Libra", icon: <GiLibra /> },
  { name: "Scorpius", icon: <GiScorpio /> },
  { name: "Sagittarius", icon: <GiSagittarius /> },
  { name: "Capricornus", icon: <GiCapricorn /> },
  { name: "Aquarius", icon: <GiAquarius /> },
  { name: "Pisces", icon: <GiPisces /> },
];
