import React from "react";
import NoResult from "./NoResult";
import ProductCard from "./ProductCard";

interface ProductListProps {
  title: string;
  items: any;
}

const ProductList = ({ title, items }: ProductListProps) => {
  return (
    <div className=" space-y-4 px-5 md:p-0 lg:p-0">
      <div className=" font-bold text-3xl">{title}</div>
      {items.length === 0 && <NoResult />}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item: any) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
