import { Theme } from "../../global";

type variantType = {
  [key in Theme]: {
    bg: string;
    color: string;
    btnColor: string;
  };
};

export const VARIANT: variantType = {
  TEAL: {
    bg: "bg-teal-50",
    color: "text-teal-700",
    btnColor: "bg-teal-600 hover:bg-teal-700",
  },
  PINK: {
    bg: "bg-pink-50",
    color: "text-pink-700",
    btnColor: "bg-pink-600 hover:bg-pink-700",
  },
  ORANGE: {
    bg: "bg-orange-50",
    color: "text-orange-700",
    btnColor: "bg-orange-600 hover:bg-orange-700",
  },
};
