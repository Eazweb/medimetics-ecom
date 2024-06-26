"use client";
import { useGetAllProductsQuery } from "@/providers/toolkit/features/GetAllProductsSlice";
import ProductCard from "./ProductCard";
import ProductsSkeletons from "../temp/ProductsSkeletons";

const HomeProducts = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  if (isLoading) return <ProductsSkeletons />;
  if (error)
    return (
      <h1 className="text-2xl font-bold text-center text-red-500">
        Error: Failed to load products
      </h1>
    );
  return (
    <div className="grid p-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data && data ? (
        data?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-center text-gray-400">
          No products found
        </h1>
      )}
    </div>
  );
};

export default HomeProducts;
