import Container from "@/components/ui/contianer";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <Container>
      <div className=" flex justify-center mt-5">
        <Skeleton className=" aspect-square md:aspect-[2.8/1] rounded-lg h-[330px] md:h-[420px] overflow-hidden" />
      </div>
      <div className="flex flex-col gap-y-8 mt-10 md:mx-14">
        <div className=" space-y-4 px-5 md:p-0 lg:p-0">
          <Skeleton className=" font-bold w-[270px] h-8 rounded-md"></Skeleton>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className=" p-3 w-full h-[350px] mx-auto bg-white border rounded-md me-3"
              >
                <Skeleton className=" w-full h-[200px] rounded-md" />
                <div className=" mt-4">
                  <Skeleton className=" w-full h-5 mb-2" />
                  <Skeleton className=" w-full h-5 mb-2" />
                  <Skeleton className=" w-[50px] h-4 mb-3" />
                  <Skeleton className=" w-[90px] h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default loading;
