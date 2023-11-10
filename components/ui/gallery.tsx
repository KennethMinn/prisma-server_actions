"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import GalleryTab from "./gallery-tab";

const Gallery = ({ images }: { images: any }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleSelect = (index: number) => {
    setIndex(index);
    setSelected(index);
  };

  return (
    <div className=" flex flex-col">
      <div className="  aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
        <Image
          src={images[index].url}
          fill
          className=" aspect-square object-cover"
          alt="product Image"
        />
      </div>
      <div className=" mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image: { url: string }, index: number) => (
            <GalleryTab
              key={index}
              handleSelect={handleSelect}
              index={index}
              image={image}
              selected={selected}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
