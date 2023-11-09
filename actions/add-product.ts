"use server"; //must add cuz prisma client can run on browser

import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";

interface Image {
  url: string;
}
interface ProductData {
  title: string;
  price: number;
  category: string;
  color: string;
  size: string;
  images: Image[];
  userId: string | null | undefined;
  productId?: string;
}

export const addProduct = async (data: ProductData) => {
  if (!data.userId) return;

  await prisma.product.create({
    data: {
      userId: data.userId,
      title: data.title,
      price: data.price,
      category: data.category,
      color: data.color,
      size: data.size,
      images: {
        // already have productId cuz its created inside teh product
        createMany: {
          data: [...data.images.map((image: { url: string }) => image)], // [{url: 'url'}]
        },
      },
    },
  });
};

export const updateProduct = async (data: ProductData) => {
  const { userId } = auth();
  if (!userId) return;

  await prisma.product.update({
    where: {
      id: data.productId,
    },
    data: {
      title: data.title,
      price: data.price,
      category: data.category,
      color: data.color,
      size: data.size,
      images: {
        deleteMany: {}, // delete all images
      },
    },
  });

  await prisma.product.update({
    where: {
      id: data.productId,
    },
    data: {
      images: {
        createMany: {
          //create => {} , createMany => [{}]
          data: [...data.images.map((image: { url: string }) => image)], // [{url: 'url'}]
        },
      },
    },
  });
};
