"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { cn, colors, formatter, sizes } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface InfoProps {
  data: any;
}

const Info = ({ data }: InfoProps) => {
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color") || "black";
  const selectedSize = searchParams.get("size") || "md";

  return (
    <div>
      <h1 className=" text-3xl font-bold text-gray-900">{data.title}</h1>
      <div className=" mt-3 flex items-end justify-between">
        <p className=" text-2xl text-gray-900">
          {formatter.format(data.price)}
        </p>
      </div>
      <hr className=" my-4" />
      <div className=" flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className=" font-semibold text-black">Sizes:</h3>
          {sizes.map((size) => (
            <Link
              href={`?size=${size}&color=${selectedColor}`}
              key={size}
              className={cn(
                "border rounded-lg py-2 px-4",
                selectedSize === size && " bg-black text-white"
              )}
            >
              {size}
            </Link>
          ))}
          {/* <div>{data.size}</div> */}
        </div>
        <div className="flex items-center gap-x-4 flex-wrap">
          <h3 className=" font-semibold text-black">Color:</h3>
          {colors.map((color) => (
            <Link
              href={`?size=${selectedSize}&color=${color.name}`}
              key={color.name}
              className={cn(
                "border rounded-lg py-2 px-4 flex gap-x-3",
                selectedColor === color.name && " bg-black text-white"
              )}
            >
              {color.name}
              <div
                className=" h-6 w-6 rounded-full border border-gray-600"
                style={{ backgroundColor: data?.color?.value }}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className=" mt-10 flex items-center gap-x-3">
        <Button className=" flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
