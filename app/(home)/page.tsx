import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/contianer";
import prisma from "@/prisma/client";

const Home = async ({ searchParams }: { searchParams: any }) => {
  const products = await prisma.product.findMany({
    // skip: 2,
    take: 5,
    where: {
      // userId: process.env.NEXT_PUBLIC_ADMIN_ID,
      title: {
        contains: searchParams.title, // we can search filter with this
      },
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
          imageUrl="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8200.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1698969600&semt=ais"
        />
        <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default Home;
