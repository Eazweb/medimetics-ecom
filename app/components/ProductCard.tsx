import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
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
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white transition-shadow w-full max-w-[350px] group">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full aspect-square">
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            className="object-cover rounded-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="py-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
            {product.name.toUpperCase()}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-end gap-3 text-2xl font-bold">
            ₹{product.price}
            {product.prevPrice && (
              <span className="line-through text-lg">₹{product.prevPrice}</span>
            )}
          </div>
          {product.numReviews && (
            <div className="flex items-center">
              <div className="flex gap-1 font-semibold text-lg items-center">
                5 <Star className="w-5 h-5 text-yellow-600 fill-yellow-500" />
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.numReviews} reviews)
              </span>
            </div>
          )}
        </div>
        {product.brand && (
          <p className="text-sm text-gray-600 mb-4">{product.brand}</p>
        )}
        <ToastCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;