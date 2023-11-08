// "use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { URLSearchParams } from "url";

const colors = ["white", "black"];

const ProductDetailPage = ({ searchParams }: any) => {
  //client
  //   const router = useRouter();
  //   const searchParams = useSearchParams();
  //   const selectedColor = searchParams.get("color") || "white";

  //server
  const selectedColor = searchParams.color || "white";

  return (
    <div className=" h-screen flex items-center justify-center">
      {colors.map((color) => (
        <Link
          //`?color={$color}` or below
          href={`?${new URLSearchParams({
            color: color,
          })}`} // server | client
          //   onClick={() => router.push(`?color=${color}`)} client only
          key={color}
          className={` border-2 py-1 px-3 ms-1 ${
            color === selectedColor ? " border-blue-600" : " border-gray-400"
          }`}
        >
          {color}
        </Link>
      ))}
    </div>
  );
};

export default ProductDetailPage;
