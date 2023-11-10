import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/contianer";
import prisma from "@/prisma/client";

const Top = async () => {
  const products = await prisma.product.findMany({
    where: {
      userId: process.env.NEXT_PUBLIC_ADMIN_ID,
      category: "tops",
    },
    include: {
      images: true, //gotta include to get access to the relationship model
    },
  });

  return (
    <Container>
      <div className=" space-y-10 pb-10">
        <Billboard
          label="Explore the Tops"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVA7CwRI26PUHxxMM7zSCQXs0xUrKbgncT9g&usqp=CAU"
        />
        <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default Top;
