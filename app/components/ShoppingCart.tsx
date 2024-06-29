"use client";

import { DeleteItem } from "@/providers/toolkit/features/DeleteCartItemSlice";
import { GetCartItems } from "@/providers/toolkit/features/GetUserAllCartitems";
import {
  useAppDispatch,
  useAppSelector,
} from "@/providers/toolkit/hooks/hooks";
import { TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  product: {
    name: string;
    mainImage: string;
    price: number;
  };
  color?: string;
  size?: string;
  quantity: number;
}

interface User {
  id: string;
}

type RootState = {
  cartItems: {
    items: {
      data: Product[];
    };
  };
};
const ShoppingCart = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const userId = session?.user ? (session.user as User).id : null;
  const cartItemsFromStore = useAppSelector(
    (state: RootState) => state.cartItems.items.data
  );
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(cartItemsFromStore);
  }, [cartItemsFromStore]);

  useEffect(() => {
    if (userId) {
      dispatch(GetCartItems(userId));
    }
  }, [userId, dispatch]);

  const totalAmount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, product) => total + product.product.price * product.quantity,
        0
      )
    : 0;

  const handleRemoveItem = (product: any) => {
    dispatch(
      DeleteItem({
        userId: userId as string,
        product: { id: product.productId },
      })
    );
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-100 relative">
      <div className="md:w-3/4 p-4 bg-white rounded-lg shadow-md mb-6 md:mb-0">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((product) => (
            <div
              key={product.id}
              className="flex items-center mb-6 border-b pb-4 last:border-b-0"
            >
              <Image
                width={100}
                height={100}
                src={product.product.mainImage}
                alt={product.product.name}
                className="w-24 h-24 mr-6 rounded-md object-contain"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.product.name}
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
                      ₹{product.product.price}
                    </p>
                    <button
                      className="text-red-500 hover:text-white hover:bg-red-500 transition-all duration-150 border p-1 border-red-500 rounded"
                      onClick={() => handleRemoveItem(product)}
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-xl flex items-center justify-center font-bold w-full">
            No items in the cart.
          </p>
        )}
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
