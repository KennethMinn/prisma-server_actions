import Info from "@/components/Info";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/contianer";
import Gallery from "@/components/ui/gallery";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product?.category,
    },
    include: {
      images: true,
    },
  });

  const suggestedProducts = relatedProducts.filter(
    (product) => product.id !== params.productId
  );

  return (
    <div className=" bg-white">
      <Container>
        <div className=" px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product?.images} />
            <div className=" mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
        </div>
        <hr className=" my-10" />
        <ProductList items={suggestedProducts} title="Related Items" />
      </Container>
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
