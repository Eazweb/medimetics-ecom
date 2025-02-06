import Category from "./components/Category";
import Hero from "./components/Hero";
import HomeProducts from "./components/HomeProducts";
import ResponsiveCarousel from "./components/ResponsiveCarousel";

export default function Home() {
  return (
    <div className="w-[90%] mx-auto py-10">
      {/* <Hero /> */}
      <ResponsiveCarousel/>
      {/* <Category /> */}
      <h1 className="text-3xl font-bold text-center md:text-start my-5 w-4/5 mx-auto ">
        New
        <span className="text-blue-500"> Products</span>
      </h1>
      <HomeProducts />
    </div>
  );
}
