import { Link } from "next-view-transitions";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
  description: "Category page",
};

const Category = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-hidden">
      <Link
        href={"/category/man"}
        className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-card-foreground p-8 sm:p-10 md:p-20 lg:p-36 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 duration-300"
      >
        <Image
          width={2070}
          height={1000}
          src="https://images.unsplash.com/photo-1517940310602-26535839fe84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="man"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <p className="text-accent-foreground text-sm md:text-xl">#Man</p>
          <h2 className="text-3xl font-extrabold">
            Showcase Your Style with the Latest Trends
          </h2>
        </div>
      </Link>
      <Link
        href={"/category/woman"}
        className="relative bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-card-foreground p-8 sm:p-10 md:p-20 lg:p-36 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 duration-300"
      >
        <Image
          width={2070}
          height={1000}
          src="https://images.unsplash.com/flagged/photo-1553802922-2eb2f7f2c65b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="woman"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <p className="text-accent-foreground text-sm md:text-xl">#Woman</p>
          <h2 className="text-3xl font-extrabold">
            Explore Our Woman&apos;s Fashion Collection
          </h2>
        </div>
      </Link>
      <Link
        href={"/category/children"}
        className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-card-foreground p-8 sm:p-10 md:p-20 lg:p-36 col-span-1 md:col-span-2 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 duration-300"
      >
        <Image
          width={2070}
          height={1000}
          src="https://images.unsplash.com/photo-1519308914928-2e6b45de9ac1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="children"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <p className="text-accent-foreground text-sm md:text-xl">#children</p>
          <h2 className="text-3xl font-extrabold">
            Discover the Latest in Children&apos;s Fashion
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default Category;
