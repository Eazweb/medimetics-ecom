"use client";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "@/providers/toolkit/features/GetAllProductsSlice";
import ProductCard from "./ProductCard";
import ProductsSkeletons from "../temp/ProductsSkeletons";

type Product = {
  id: number;
  name: string;
  price: number;
  mainImage: string;
  otherImages: string;
};

const HomeProducts = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      const shuffledData = shuffleArray([...data]);
      const selectedData = shuffledData.slice(0, 8);
      setRandomProducts(selectedData);
    }
  }, [data]);

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  if (isLoading) return <ProductsSkeletons />;
  if (error)
    return (
      <h1 className="text-2xl font-bold text-center text-red-500">
        Error: Failed to load products
      </h1>
    );

  return (
    <div className="mx-10 grid p-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {randomProducts.length > 0 ? (
        randomProducts.map((product, index) => (
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
