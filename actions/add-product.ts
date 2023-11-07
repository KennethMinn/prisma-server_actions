"use server";

import prisma from "@/prisma/client";

export const addProduct = async (title: string) => {
  if (!title) return;

  await prisma.product?.create({
    data: {
      title,
    },
  });
};
