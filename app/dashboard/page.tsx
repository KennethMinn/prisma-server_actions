import React from "react";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { ProductColumn } from "./components/Columns";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import ProductsClient from "./components/ProductsClient";

const Dashboard = async () => {
  const { userId } = auth();

  if (!userId) return;

  const products = await prisma.product?.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products
    ? products.map((product) => ({
        id: product.id,
        title: product.title,
        price: formatter.format(product.price.toNumber()),
        category: product.category,
        size: product.size,
        color: product.color,
        createdAt: format(product.createdAt, "MMMM do, yyyy"),
      }))
    : [];

  return (
    <div>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductsClient data={formattedProducts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
