"use server"; //must add cuz prisma client can run on browser

import prisma from "@/prisma/client";

export const addProduct = async (title: string) => {
  if (!title) return;

  await prisma.product?.create({
    data: {
      title,
    },
  });
};
