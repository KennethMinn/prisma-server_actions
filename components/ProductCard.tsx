"use client";

import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import IconButton from "./ui/icon-button";
import PreviewModal from "./PreviewModal";
import { useRouter } from "next/navigation";
import { formatter } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

const ProductCard = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const cart = useCart();

  const onPreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(true);
  };

  const addToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <>
      <PreviewModal data={data} open={open} onClose={() => setOpen(false)} />
      <div
        onClick={() => router.push(`products/${data.id}`)}
        className=" bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      >
        <div className=" aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={data?.images[0]?.url}
            fill
            alt="img"
            className=" aspect-square object-cover"
          />
          <div className=" opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className=" flex gap-x-6 justify-center items-center">
              <IconButton
                icon={<Expand size={20} />}
                onClick={(e) => onPreview(e)}
              />
              <IconButton
                icon={<ShoppingCart size={20} />}
                onClick={(e) => addToCart(e)}
              />
            </div>
          </div>
        </div>
        <div className="">
          <p className=" font-semibold text-lg">{data.title}</p>
          <p className=" text-sm text-gray-500">{data.category}</p>
        </div>
        <div className=" flex items-center justify-between">
          <div className=" font-bold">
            {/* {Number(data.price).toFixed(2)} */}
            {formatter.format(Number(data.price))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
