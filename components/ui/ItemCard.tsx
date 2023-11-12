"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Product } from "@/types";
import { useCart } from "@/hooks/use-cart";

interface ItemCardProps {
  item: Product;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const cart = useCart();

  const removeCartItem = () => {
    cart.removeItem(item.id);
  };
  return (
    <div className="lg:col-span-3 border p-5 rounded-md">
      <div className="grid gap-6">
        <div className="flex items-center gap-6">
          <Image
            alt="Product Image"
            className="object-cover w-25 h-25 rounded-lg overflow-hidden"
            height="100"
            src={item.images[0].url}
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div className="flex-1 grid gap-2">
            <h2 className=" text-sm md:text-lg font-semibold">{item.title}</h2>
            <div className="text-lg font-semibold">${item.price}</div>
          </div>
          <div className=" text-red-600" onClick={removeCartItem}>
            <Trash2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
