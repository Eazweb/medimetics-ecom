"use client";
import { useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/app/temp/shop";
import { Grid, List } from "lucide-react";

const AllProducts = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<string>("1");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "2":
        return a.price - b.price;
      case "3":
        return b.price - a.price;
      case "4":
        return a.name.localeCompare(b.name);
      case "5":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full items-center justify-between p-4 bg-gray-100 rounded-lg shadow z-50 sticky top-0">
        <div className="flex items-center">
          <span className="ml-2 font-semibold text-gray-800">All Products</span>
        </div>
        <div className="flex gap-3 items-center">
          <Grid
            size={24}
            className={`text-gray-600 hover:text-gray-500 cursor-pointer ${
              viewMode === "grid"
                ? "bg-gray-800 text-white p-[3px] rounded"
                : ""
            }`}
            onClick={() => setViewMode("grid")}
          />
          <List
            size={24}
            className={`text-gray-600 hover:text-gray-500 cursor-pointer ${
              viewMode === "list"
                ? "bg-gray-800 text-white p-[3px] rounded"
                : ""
            }`}
            onClick={() => setViewMode("list")}
          />
          <select
            className="p-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:border-gray-400 focus:ring-blue-500 focus:border-blue-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="1">Sort by</option>
            <option value="2">Price: Low to High</option>
            <option value="3">Price: High to Low</option>
            <option value="4">Name: A to Z</option>
            <option value="5">Name: Z to A</option>
          </select>
        </div>
      </div>
      <div
        className={`p-4 z-30 ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            : "grid grid-cols-2 gap-4"
        }`}
      >
        {sortedProducts?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
