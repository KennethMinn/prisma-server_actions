import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/contianer";
import prisma from "@/prisma/client";

const Home = async () => {
  const products = await prisma.product.findMany({
    where: {
      userId: process.env.NEXT_PUBLIC_ADMIN_ID,
    },
    include: {
      images: true, //gotta include to get access to the relationship model
    },
  });

  return (
    <Container>
      <div className=" space-y-10 pb-10">
        <Billboard
          label="Explore the featured Products"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78GpbfqMSXlW6QaFXVZdxF6jLNx8Au_qfRVEJ4aAICzDgB13BFmF-pO-LAqarfuKDr44&usqp=CAU"
        />
        <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default Home;
