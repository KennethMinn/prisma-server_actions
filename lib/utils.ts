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
];
export const sizes = ["xs", "md", "lg", "xl", "2xl"];
