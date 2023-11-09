import Billboard from "@/components/Billboard";
import Container from "@/components/ui/contianer";

const Home = () => {
  return (
    <Container>
      <div className=" space-y-10 pb-10">
        <Billboard
          label="Explore the featured Products"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78GpbfqMSXlW6QaFXVZdxF6jLNx8Au_qfRVEJ4aAICzDgB13BFmF-pO-LAqarfuKDr44&usqp=CAU"
        />
      </div>
    </Container>
  );
};

export default Home;
