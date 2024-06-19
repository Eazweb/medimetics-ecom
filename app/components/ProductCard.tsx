import Image from "next/image";
import React from "react";
import ToastCartButton from "./ToastCartButton";
import { Link } from "next-view-transitions";

const ProductCard = ({ product }: any) => {
  return (
    <div className="w-full mx-auto my-8">
      <div className="relative overflow-hidden rounded-lg shadow-lg group">
        <Link href={"/products/1"} className="w-full h-84 overflow-hidden">
          <Image
            width={1000}
            height={1200}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-100 ease-in-out group-hover:opacity-0"
          />
          <Image
            width={1000}
            height={1200}
            src={product.hoverImage}
            alt={product.name}
            className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-100 ease-in-out opacity-0 group-hover:opacity-100"
          />
        </Link>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-100 transition-opacity duration-100 ease-in-out opacity-100">
          <h2 className="text-white text-xl font-semibold">{product.name}</h2>
          <p className="text-white text-lg">₹{product.price}</p>
          <ToastCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
