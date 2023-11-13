import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const categories = ["tops", "pants", "sports", "hats", "shoes"];
export const colors = [
  {
    name: "black",
    value: "#000000",
  },
  {
    name: "white",
    value: "#fffff",
  },
  {
    name: "red",
    value: "#FF0000",
  },
  {
    name: "green",
    value: "#00FF00",
  },
  {
    name: "blue",
    value: "#0000FF",
  },
  {
    name: "yellow",
    value: "#FFFF00",
  },
  {
    name: "purple",
    value: "#800080",
  },
  {
    name: "orange",
    value: "#FFA500",
  },
  {
    name: "pink",
    value: "#FFC0CB",
  },
  {
    name: "brown",
    value: "#A52A2A",
  },
  {
    name: "gold",
    value: "#FFD700",
  },
];
export const sizes = ["xs", "md", "lg", "free", "xl", "2xl"];

export const payment_cards = [
  {
    name: "credit_card",
    image: "https://www.lhv.ee/assets/images/cards/gold-credit.png",
  },
  {
    name: "visa_card",
    image:
      "data:image/png;base64,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",
  },
  {
    name: "kbz_card",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3oBSoQuNGhFC6sLgxbGXa8brSPqi9NhqXPpHjULAJ9HtOUpuMEAONgNP3tL6b8JojIsU&usqp=CAU",
  },
];
