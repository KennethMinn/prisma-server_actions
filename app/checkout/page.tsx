"use client";

import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn, payment_cards } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { shippingFee } from "../cart/page";
import { Loader } from "@/components/ui/loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  address: z.string().min(1),
  card_number: z.string().min(1),
  expire_date: z.string().min(1),
  cvv: z.string().min(1),
});

export default function Component() {
  const [active, setActive] = useState("credit_card");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subTotal = cart.items.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const total = shippingFee + subTotal;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!cart.items || cart.items.length === 0)
      return toast.error("No item in cart");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment completed successfully");
      cart.removeAll();
      router.push("/");
    }, 3000);
  }

  if (!mounted) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col w-full px-4 py-8 md:px-8 lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Shipping Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="w-full mt-8">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="card_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Card Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="expire_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expire Date</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Expire Date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="CVV" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="w-full mt-8">
              <CardHeader>
                <CardTitle>Choose a payment method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  {payment_cards.map((card) => (
                    <Image
                      key={card.name}
                      alt="Credit Card"
                      height="50"
                      className={cn(
                        "border-4 rounded-md border-gray-300 cursor-pointer",
                        active === card.name
                          ? " border-black"
                          : " border-gray-300"
                      )}
                      onClick={() => setActive(card.name)}
                      src={card.image}
                      style={{
                        aspectRatio: "100/50",
                        objectFit: "cover",
                      }}
                      width="100"
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={loading} className="w-full" type="submit">
                  {loading ? <Loader text="purchasing" /> : "Confirm and Pay"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full mt-8 lg:w-1/2 lg:pl-8 lg:mt-0">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.title}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between font-bold">
                  <span>Sub Total</span>
                  <span>${subTotal}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Shipping Fee</span>
                  <span>${shippingFee}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
