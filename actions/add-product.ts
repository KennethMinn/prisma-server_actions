"use server"; //must add cuz prisma client can run on browser

import { ProductColumn } from "@/app/dashboard/components/Columns";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { Image, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addProduct = async (values: any) => {
  const { userId } = auth();
  if (!userId) return;

  await prisma.product.create({
    data: {
      title: values.title,
      price: values.price,
      category: values.category,
      color: values.color,
      size: values.size,
      images: {
        // already have productId cuz its created inside teh product
        createMany: {
          data: [...values.images.map((image: { url: string }) => image)], // [{url: 'url'}]
        },
      },
      userId,
    },
  });
};
