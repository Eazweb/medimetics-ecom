"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface ProductProps {
  product: {
    title: string;
    description: string;
    images: string[];
    colors?: string[];
    sizes?: string[];
  };
}

// Product component definition
const Product: React.FC<ProductProps> = ({ product }) => {
  const { title, description, images, colors, sizes } = product;
  const [selectedImage, setSelectedImage] = React.useState(images[0]);
  const [selectedColor, setSelectedColor] = React.useState(
    colors ? colors[0] : ""
  );
  const [selectedSize, setSelectedSize] = React.useState(sizes ? sizes[0] : "");
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="container mx-auto p-4 md:flex">
      {/* Image and thumbnail section */}
      <div className="md:w-1/2">
        <img src={selectedImage} alt="Product" className="w-full h-auto mb-4" />
        <div className="flex space-x-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-24 h-24 cursor-pointer border ${
                selectedImage === image ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
      {/* Product details section */}
      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="mb-4">{description}</p>
        {/* Color selection */}
        {colors && (
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
                />
              ))}
            </div>
          </div>
        )}
        {/* Size selection */}
        {sizes && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Size</h2>
            <div className="flex space-x-2">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border ${
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
          <input
            id="quantity"
            type="number"
            className="w-20 border border-gray-300 rounded p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            aria-describedby="quantityHelp"
          />
          <p id="quantityHelp" className="mt-1 text-sm text-gray-500">
            Use the arrows or type to adjust the quantity.
          </p>
        </div>
        <Button className="text-white px-6 py-2 rounded">Add to Cart</Button>
      </div>
    </div>
  );
};

// App component definition
const App: React.FC = () => {
  // Product data object
  const productData = {
    title: "Stylish Shirt",
    description:
      "A very stylish shirt that comes in multiple colors and sizes.",
    images: [
      "https://via.placeholder.com/400x400.png?text=Main+Image",
      "https://via.placeholder.com/100x100.png?text=Image+1",
      "https://via.placeholder.com/100x100.png?text=Image+2",
      "https://via.placeholder.com/100x100.png?text=Image+3",
    ],
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    sizes: ["S", "M", "L", "XL"],
  };

  // Passing product data as props to the Product component
  return (
    <div className="App">
      <Product product={productData} />
    </div>
  );
};

export default App;
