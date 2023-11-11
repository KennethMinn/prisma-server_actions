"use client";

import ItemCard from "@/components/ui/ItemCard";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";

export default function Component() {
  const cart = useCart();

  const shippingFee = 5;
  const subTotal = cart.items.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const total = shippingFee + subTotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:relative">
      <h1 className="text-3xl font-semibold mb-8">My Cart</h1>
      <div className="grid lg:grid-cols-5 gap-6">
        {cart.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}

        <aside className="lg:col-span-2 md:absolute md:right-0 md:top-[100px] md:w-[400px]">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">${shippingFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold">${total}</span>
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
