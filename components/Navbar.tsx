"use client";

import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  console.log(pathname);
  const routes = [
    {
      label: "Some",
      href: "/some",
      active: pathname === "/some",
    },
    {
      label: "Some1",
      href: "/some1",
      active: pathname === "/some1",
    },
    {
      label: "Some2",
      href: "/some2",
      active: pathname === "/some2",
    },
  ];
  return (
    <nav className="py-5 flex items-center px-4">
      <Link href={"/"}>
        <h1 className="font-bold text-3xl me-8">LOgo</h1>
      </Link>
      <div className="flex justify-center items-center gap-3">
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
      <div className="ml-auto flex gap-3 items-center">
        {!userId && (
          <Link
            className=" bg-black text-white rounded-md py-1 px-2"
            href="/sign-in"
          >
            SignIn
          </Link>
        )}
        <Link
          href="/dashboard"
          className={cn(
            " text-gray-400",
            pathname === "/dashboard" ? " text-black" : "text-gray-400"
          )}
        >
          {userId === process.env.NEXT_PUBLIC_ADMIN_ID && "Dashboard"}
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
