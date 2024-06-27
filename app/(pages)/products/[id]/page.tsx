"use client";
import React, { useState } from "react";
import SingleProductSkeleton from "@/app/temp/SingleProductSkeleton";
import { useGetProductByIdQuery } from "@/providers/toolkit/features/GetAllProductsSlice";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useSwipeable } from "react-swipeable";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  mainImage: string;
  categories: Array<any>;
  sizes: Array<any>;
  colors: Array<any>;
  otherImages: string;
};
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length),
    onSwipedRight: () =>
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      ),
  });

  if (isLoading) return <SingleProductSkeleton />;
  if (error) return <div>Error: fetch product with id {id} failed.</div>;

  if (!data) return <div>Product not found.</div>;

  const { name, description, mainImage, otherImages, price, sizes, colors } =
    data as Product;
  const images = [mainImage, ...otherImages.split(",")];

  return (
    <div className="container mx-auto p-4 md:flex">
      {/* Image and thumbnail section */}
      <div className="md:w-1/2">
        <div
          {...handlers}
          className="w-full h-auto mb-4 rounded overflow-hidden"
        >
          <Image
            width={400}
            height={500}
            src={images[currentIndex]}
            alt="Product"
            className="w-full h-auto"
          />
        </div>

        <div className="flex space-x-2">
          {images.map((image, index) => (
            <Image
              key={index}
              width={100}
              height={100}
              src={image}
              alt="Product"
              className={`w-24 h-24 rounded object-contain ${
                currentIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      {/* Product details section */}
      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <p className="mb-4">{description}</p>
        <Badge className="mb-4">
          {data?.categories?.map((category: any) => (
            <span key={category?.id}>{category?.name}</span>
          ))}
        </Badge>

        <p className="text-2xl font-semibold">₹{price}</p>

        {colors && colors.length > 0 && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Color</h2>
            <div className="flex space-x-2">
              {colors.map((color: any, index: number) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}
        {/* Size selection */}
        {sizes && sizes.length > 0 && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Size</h2>
            <div className="flex space-x-2">
              {sizes.map((size: string, index: number) => (
                <button
                  key={index}
                  className={`px-4 py-2 border-2 rounded ${
                    selectedSize === size
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Quantity input */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block font-semibold mb-2">
            Quantity
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 border border-gray-300 rounded p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            aria-describedby="quantityHelp"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <Button className="text-white px-6 py-2 rounded">Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductPage;
