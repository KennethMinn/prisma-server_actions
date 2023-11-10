"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Gallery from "./ui/gallery";
import Info from "./Info";
import Container from "./ui/contianer";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { formatter } from "@/lib/utils";

interface PreviewModalProps {
  open: boolean;
  data: any;
  onClose: () => void;
}

const PreviewModal = ({ open, data, onClose }: PreviewModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="">
        <div className="grid w-full grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
          <div className="sm:col-span-4 lg:col-span-5">
            <Gallery images={data.images} />
          </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div>
                <h1 className=" text-xl font-bold text-gray-900">
                  {data.title}
                </h1>
                <div className=" mt-3 flex items-end justify-between">
                  <p className=" text-2xl text-gray-900">
                    {formatter.format(data.price)}
                  </p>
                </div>
                <hr className=" my-4" />
                <div className=" flex flex-col gap-y-6">
                  <div className="flex items-center gap-x-4 flex-wrap">
                    <h3 className=" font-semibold text-black">Sizes:</h3>
                    {data.size}
                  </div>
                  <div className="flex items-center gap-x-4 flex-wrap">
                    <h3 className=" font-semibold text-black">Colors</h3>
                    <div
                      className=" w-4 h-4 rounded-full p-4 border"
                      style={{ backgroundColor: data.color.value }}
                    />
                  </div>
                </div>
                <div className=" mt-10 flex items-center gap-x-3">
                  <Button className=" flex items-center gap-x-2">
                    Add To Cart
                    <ShoppingCart />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
