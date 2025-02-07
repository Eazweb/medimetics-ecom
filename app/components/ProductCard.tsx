import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import ToastCartButton from "./ToastCartButton";

type Product = {
  id: number;
  name: string;
  price: number;
  prevPrice?: number;
  mainImage: string;
  otherImages: string;
  numReviews?: number;
  brand?: string;
  sizes?: string[];
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="w-full flex flex-col h-full group bg-white rounded-lg  overflow-hidden transition-shadow ">
      {/* Image with Link */}
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square w-full relative overflow-hidden">
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4">
        {/* Product Name with Link */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-md md:text-2xl font-light line-clamp-2 hover:text-green-400 transition-colors">
            {product.name.toUpperCase()}
          </h3>
        </Link>

        {/* Price and Sizes */}
        <div className="flex justify-between items-center mt-2 mb-3">
          <div className="flex items-end gap-3 text-xl font-semibold">
            ₹{product.price}
            {product.prevPrice && (
              <span className="line-through text-sm text-gray-500">
                ₹{product.prevPrice}
              </span>
            )}
          </div>
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-300"
                >
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Reviews */}
        {product.numReviews && (
          <div className="flex items-center mb-2">
            <div className="flex gap-1 font-semibold text-lg items-center">
              5 <Star className="w-5 h-5 text-yellow-600 fill-yellow-500" />
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.numReviews} reviews)
            </span>
          </div>
        )}

        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        )}

        {/* Add to Cart Button */}
        <ToastCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
