import ProductCard from "./ProductCard";
import { products } from "../temp/shop";

const HomeProducts = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {products && products ? (
        products?.map((product, index) => (
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
