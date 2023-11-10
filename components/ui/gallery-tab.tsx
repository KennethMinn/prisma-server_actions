import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryTabProps {
  index: number;
  handleSelect: (index: number) => void;
  image: {
    url: string;
  };
  selected: number;
}

const GalleryTab = ({
  index,
  handleSelect,
  image,
  selected,
}: GalleryTabProps) => {
  return (
    <div
      key={index}
      onClick={() => handleSelect(index)}
      className=" relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
    >
      <div className="">
        <span className=" absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
          <Image
            src={image.url}
            alt="image"
            fill
            className=" object-cover object-center"
          />
        </span>
        <span
          className={cn(
            "absolute inset-0 rounded-md ring-2 ring-offset-2",
            selected === index ? "ring-black" : "ring-transparent"
          )}
        />
      </div>
    </div>
  );
};

export default GalleryTab;
