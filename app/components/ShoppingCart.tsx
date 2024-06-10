import { TrashIcon } from "lucide-react";
import React from "react";

const ShoppingCart = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/150",
      color: "Red",
      size: "M",
      price: 499,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      price: 999,
      quantity: 1,
    },
    {
      id: 3,
      name: "Product 3",
      image: "https://via.placeholder.com/150",
      color: "Blue",
      size: "L",
      price: 750,
      quantity: 3,
    },
    {
      id: 4,
      name: "Product 4",
      image: "https://via.placeholder.com/150",
      color: "Green",
      size: "S",
      price: 650,
      quantity: 2,
    },
    {
      id: 5,
      name: "Product 5",
      image: "https://via.placeholder.com/150",
      color: "Yellow",
      size: "XL",
      price: 300,
      quantity: 1,
    },
    {
      id: 6,
      name: "Product 6",
      image: "https://via.placeholder.com/150",
      color: "Black",
      size: "M",
      price: 1200,
      quantity: 2,
    },
    {
      id: 7,
      name: "Product 7",
      image: "https://via.placeholder.com/150",
      color: "White",
      size: "L",
      price: 850,
      quantity: 1,
    },
    {
      id: 8,
      name: "Product 8",
      image: "https://via.placeholder.com/150",
      color: "Purple",
      size: "S",
      price: 550,
      quantity: 3,
    },
    {
      id: 9,
      name: "Product 9",
      image: "https://via.placeholder.com/150",
      color: "Orange",
      size: "XL",
      price: 400,
      quantity: 2,
    },
    {
      id: 10,
      name: "Product 10",
      image: "https://via.placeholder.com/150",
      color: "Pink",
      size: "M",
      price: 999,
      quantity: 1,
    },
  ];

  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-100  relative">
      <div className="md:w-3/4 p-4 bg-white rounded-lg shadow-md mb-6 md:mb-0">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center mb-6 border-b pb-4 last:border-b-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 mr-6 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              {product.color && (
                <p className="text-gray-600 mb-1">Color: {product.color}</p>
              )}
              {product.size && (
                <p className="text-gray-600 mb-1">Size: {product.size}</p>
              )}
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">
                    ₹{product.price}
                  </p>
                  <button className="text-red-500 hover:text-white hover:bg-red-500 transition-all duration-150 border p-1 border-red-500 rounded ">
                    <TrashIcon size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="md:w-1/4 p-4 bg-white rounded-lg shadow-md md:ml-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Payment Summary
        </h2>
        <div className="text-lg mb-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>₹99</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{totalAmount + 99}</span>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
