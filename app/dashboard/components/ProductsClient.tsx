"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";

interface ProductsClientProps {
  data: ProductColumn[];
}

const ProductsClient = ({ data }: ProductsClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Header
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/dashboard/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <Separator />
    </>
  );
};

export default ProductsClient;
