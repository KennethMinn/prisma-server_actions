"use client";

import { categories, cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import { AlignJustify, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { useCart } from "@/hooks/use-cart";
import SearchBar from "./ui/SearchBar";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const routes = categories.map((category) => ({
    label: category.replace(category[0], category[0].toUpperCase()),
    href: `/${category}`,
    active: pathname === `/${category}`, //need cn to make it work
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="py-3 flex items-center px-4">
      {/* Desktop Navbar */}
      <Link href={"/"}>
        <div className="relative aspect-square w-[40px] ">
          <Image
            fill
            className=""
            src="https://sisburma.com/wp-content/uploads/2023/06/sis_burma_logo.png"
            alt="logo"
          />
        </div>
      </Link>
      <div className=" border-r-2 md:inline-block hidden  h-[30px] mx-10" />
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
      </div>

      {/* root links */}
      <div className="flex gap-4 items-center ms-3">
        <SearchBar />
        <Link href="/cart" className={cn(" text-gray-400 ml-auto")}>
          <div className=" relative">
            <ShoppingCart size={32} />
            <span className=" w-5 h-5 rounded-full bg-black flex items-center justify-center right-[-5px] top-[-2px] absolute">
              {cart.items.length}
            </span>
          </div>
        </Link>
        <div className=" border-r h-10 border-gray-300 mx-1 md:mx-3" />
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* mobile Navbar */}
      <div className=" ml-auto ms-3 md:hidden">
        <div className="relative select-none flex items-center gap-3">
          <div className=" " onClick={() => setOpen((prev) => !prev)}>
            {open ? <X /> : <AlignJustify size={30} />}
          </div>
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
