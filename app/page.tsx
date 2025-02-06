import Link from "next/link";
import Category from "./components/Category";
import { CompareDemo } from "./components/CompareDemo";
import Hero from "./components/Hero";
import HomeProducts from "./components/HomeProducts";
import Problems from "./components/Problems";
import ResponsiveCarousel from "./components/ResponsiveCarousel";

export default function Home() {
  return (
    <div className="w-[90%] mx-auto py-10">
      <ResponsiveCarousel />
      <Problems />
      
      {/* Products Section */}
      <section className="mb-20"> {/* Added margin-bottom */}
        <h1 className="text-3xl font-bold text-center md:text-start my-5 w-4/5 mx-auto">
          New
          <span className="text-blue-500"> Products</span>
        </h1>
        <HomeProducts />
      </section>

      {/* Compare Section */}
      <section className="mt-20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="flex flex-col gap-3 text-center md:text-left max-w-xl">
            <h1 className="text-3xl md:text-6xl font-semibold text-[#a7c957] md:mb-5">
              Hello Pretty Faces!
            </h1>
            <p className="text-xl font-light">
              You can see the difference that our products make and give your skin
              the glow it deserves.
            </p>
            <p className="text-xl font-light">
              Join us on this journey to healthy and radiant skin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/products">
                <button className="px-6 py-2 border-2 border-[#a7c957] text-[#a7c957] rounded-md hover:bg-[#a7c957] hover:text-white transition-colors">
                  Explore Products
                </button>
              </Link>
              <Link href="/about">
                <button className="px-6 py-2 border-2 border-[#a7c957] text-[#a7c957] rounded-md hover:bg-[#a7c957] hover:text-white transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <CompareDemo />
        </div>
      </section>
    </div>
  );
}
