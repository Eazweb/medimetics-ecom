import React from "react";
import CreateProduct from "@/app/_dashboardComponents/CreateProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
  description: "Add a new product to your store",
};

export default function AddProductPage() {
  return (
    <div className="p-6">
      <CreateProduct />
    </div>
  );
}
