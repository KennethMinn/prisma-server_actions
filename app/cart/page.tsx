import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function Component() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:relative">
      <h1 className="text-3xl font-semibold mb-8">My Cart</h1>
      <div className="grid lg:grid-cols-5 gap-6">
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
                <h2 className="text-lg font-semibold">Product Name</h2>
                <div className="text-lg font-semibold">$99</div>

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
        <aside className="lg:col-span-2 md:absolute md:right-0 md:top-[100px] md:w-[400px]">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">$99</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">$10</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold">$109</span>
                </div>
                <Button className="mt-4" size="lg">
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
