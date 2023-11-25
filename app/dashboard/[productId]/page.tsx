import prisma from "@/prisma/client";
import ProductForm from "./components/ProductForm";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prisma.product?.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialValues={product} />
      </div>
    </div>
  );
};

export default ProductPage;

export const generateStaticParams = async () => {
  const products = await prisma.product.findMany({
    where: {
      userId: process.env.NEXT_PUBLIC_ADMIN_ID,
    },
    include: {
      images: true,
    },
  });

  return products.map((product) => ({
    productId: product.id.toString(),
  }));
};
