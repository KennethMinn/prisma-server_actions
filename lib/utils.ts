import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const categories = ["top", "pants", "sports", "hats", "shoes"];
export const colors = [
  {
    name: "black",
    value: "#000000",
  },
  {
    name: "white",
    value: "#fffff",
  },
];
export const sizes = ["xs", "md", "lg", "xl", "2xl"];
