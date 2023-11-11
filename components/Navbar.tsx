"use client";

import { categories, cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import { AlignJustify, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { useCart } from "@/hooks/use-cart";

const Navbar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const cart = useCart();
  const [open, setOpen] = useState(false);

  const routes = categories.map((category) => ({
    label: category.replace(category[0], category[0].toUpperCase()),
    href: `/${category}`,
    active: pathname === `/${category}`, //need cn to make it work
  }));

  return (
    <nav className="py-3 flex items-center px-4">
      {/* Desktop Navbar */}
      <Link href={"/"}>
        <h1 className="font-bold text-3xl me-8 border-r-2 pr-8">LOgo</h1>
      </Link>
      <div className="md:flex justify-center items-center gap-x-8 hidden">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              " text-gray-400",
              route.active ? " text-black" : "text-gray-400"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="ml-auto  md:flex gap-3 items-center hidden">
        <Link href="/cart" className={cn(" text-gray-400 ml-auto")}>
          <div className=" relative">
            <ShoppingCart size={37} />
            <span className=" w-5 h-5 rounded-full bg-black flex items-center justify-center right-[-5px] top-[-2px] absolute">
              {cart.items.length}
            </span>
          </div>
        </Link>
        {!userId && (
          <Link
            className=" bg-black text-white rounded-md py-1 px-2"
            href="/sign-in"
          >
            SignIn
          </Link>
        )}
        {userId === process.env.NEXT_PUBLIC_ADMIN_ID && (
          <Link
            href="/dashboard"
            className={cn(
              " text-gray-400",
              pathname === "/dashboard" ? " text-black" : "text-gray-400"
            )}
          >
            Dashboard
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* mobile Navbar */}
      <div className=" ml-auto md:hidden">
        <div className="relative select-none flex items-center gap-3">
          <div className=" " onClick={() => setOpen((prev) => !prev)}>
            {open ? <X /> : <AlignJustify size={25} />}
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
        {open && (
          <div className=" bg-gray-300 px-8 py-2 absolute z-10 right-[55px] rounded-md">
            <div className=" flex flex-col gap-2">
              {routes.map((route) => (
                <Link
                  href={route.href}
                  key={route.href}
                  className={cn(
                    " text-gray-400",
                    route.active ? " text-black" : "text-gray-400"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <div className="">
                {!userId && (
                  <Link
                    href={"/sign-in"}
                    className={cn(" text-gray-400")}
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
                {userId === process.env.NEXT_PUBLIC_ADMIN_ID && (
                  <Link
                    href="/dashboard"
                    className={cn(
                      " text-gray-400",
                      pathname === "/dashboard"
                        ? " text-black"
                        : "text-gray-400"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
