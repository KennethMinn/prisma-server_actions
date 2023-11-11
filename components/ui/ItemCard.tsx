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

interface ItemCardProps {
  item: Product;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div className="lg:col-span-3 border p-5 rounded-md">
      <div className="grid gap-6">
        <div className="flex items-start gap-6">
          <Image
            alt="Product Image"
            className="object-cover w-25 h-25 rounded-lg overflow-hidden"
            height="100"
            src="https://static.wixstatic.com/media/919f0a_6d003d12476746ea8de5ba19cd3d7cdb~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/919f0a_6d003d12476746ea8de5ba19cd3d7cdb~mv2.png"
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div className="flex-1 grid gap-2">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <div className="text-lg font-semibold">${item.price}</div>

            <div className="flex items-center gap-4">
              <Label className="text-base" htmlFor="quantity">
                Quantity
              </Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className=" text-red-600">
            <Trash2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
