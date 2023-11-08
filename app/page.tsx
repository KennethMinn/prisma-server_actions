"use client";

import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addProduct } from "@/actions/add-product";
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(1).max(50),
});

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const { title } = values;
      await addProduct(title);
      form.reset();
      toast.success("A new product was added");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      console.log(userId);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>Form</h1>
      <Link href={"/sign-in"}>sign in</Link>
      <div>
        <UserButton afterSignOutUrl="/" />
        <div>
          {userId === "user_2XsNY4KO9yJAkmRG4MuiWk14JEL" ? "admin" : "user"}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {loading ? "Adding..." : "Add"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Home;
