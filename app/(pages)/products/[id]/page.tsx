"use client";
import React, { useEffect, useState } from "react";
import SingleProductSkeleton from "@/app/temp/SingleProductSkeleton";
import { useGetProductByIdQuery } from "@/providers/toolkit/features/GetAllProductsSlice";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useSwipeable } from "react-swipeable";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addToCartClicked, setAddToCartClicked] = useState<boolean>(false);
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length),
    onSwipedRight: () =>
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      ),
  });

  useEffect(() => {
    if (addToCartClicked) {
      if (data?.sizes && data.sizes.length > 0 && !selectedSize) {
        setSelectedSize(data.sizes[0]);
      }
      if (data?.colors && data.colors.length > 0 && !selectedColor) {
        setSelectedColor(data.colors[0]);
      }
      setAddToCartClicked(false);
    }
  }, [
    addToCartClicked,
    data?.sizes,
    data?.colors,
    selectedSize,
    selectedColor,
  ]);

  if (isLoading) return <SingleProductSkeleton />;
  if (error)
    return (
      <div>Error: Fetching product with id {id} failed. Please try again.</div>
    );
  if (!data) return <div>Product not found.</div>;

  const { sizes, colors, mainImage, name, description, price, otherImages } =
    data;
  const images = [mainImage, ...(otherImages ? otherImages.split(",") : [])];

  const handleAddToCart = () => {
    setAddToCartClicked(true);
    console.log(
      `Product ID: ${id}, Size: ${selectedSize || sizes?.[0]}, Color: ${
        selectedColor || colors?.[0]
      }, Quantity: ${quantity}`
    );
  };

  return (
    <div className="container mx-auto p-4 md:flex">
      {/* Image and thumbnail section */}
      <div className="md:w-1/2">
        <div
          {...handlers}
          className="w-full h-auto mb-4 rounded overflow-hidden"
        >
          <Image
            width={1000}
            height={1000}
            src={images[currentIndex]}
            alt="Product"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="flex space-x-2">
          {images.map((image, index) => (
            <Image
              key={index}
              width={100}
              height={100}
              src={image}
              alt="Product thumbnail"
              className={`w-24 h-24 rounded object-contain ${
                currentIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              loading="lazy"
            />
          ))}
        </div>
      </div>
      {/* Product details section */}
      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <p className="mb-4">{description}</p>
        <Badge className="mb-4">
          {data.categories.map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}
        </Badge>

        <p className="text-2xl font-semibold">₹{price}</p>

        {/* Color selection */}
        {colors && colors.length > 0 && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Color</h2>
            <div className="flex space-x-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
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
              {sizes.map((size, index) => (
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
        <Button
          onClick={handleAddToCart}
          className="text-white px-6 py-2 rounded"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
