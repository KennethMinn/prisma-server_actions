"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { cn, colors, formatter, sizes } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";

interface InfoProps {
  data: any;
}

const Info = ({ data }: InfoProps) => {
  const router = useRouter();
  const cart = useCart();
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
        <h3 className=" font-semibold text-black">Sizes</h3>
        <div className="flex items-center gap-4 flex-wrap">
          {sizes.map((size) => (
            <button
              onClick={() =>
                router.push(`?size=${size}&color=${selectedColor}`, {
                  scroll: false,
                })
              }
              key={size}
              className={cn(
                "border rounded-lg py-2 px-4",
                selectedSize === size && " bg-black text-white"
              )}
            >
              {size}
            </button>
          ))}
        </div>
        <h3 className=" font-semibold text-black">Colors</h3>
        <div className="flex items-center gap-4 flex-wrap">
          {colors.map((color) => (
            <button
              onClick={() =>
                router.push(`?size=${selectedSize}&color=${color.name}`, {
                  scroll: false,
                })
              }
              key={color.name}
              className={cn(
                "border rounded-lg py-2 px-4 flex gap-x-3",
                selectedColor === color.name && " ring-2 ring-black"
              )}
            >
              <div
                className=" h-6 w-6 rounded-full border border-gray-600"
                style={{ backgroundColor: color?.value }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className=" mt-10 flex items-center gap-x-3">
        <Button
          className=" flex items-center gap-x-2"
          onClick={() => cart.addItem(data)}
        >
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
