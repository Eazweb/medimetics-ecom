import { Link } from "next-view-transitions";
import Image from "next/image";
import React from "react";

const categories = [
  {
    label: "Men",
    imageUrl:
      "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "men-image",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    link: "/category/man",
  },
  {
    label: "Women",
    imageUrl:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "women-image",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    link: "/category/women",
  },
  {
    label: "Children",
    imageUrl:
      "https://images.unsplash.com/photo-1541580621-cb65cc53084b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "children-image",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    link: "/category/children",
  },
];

const Category = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            New Collection
          </h1>
          <p className="text-lg text-gray-600">
            Discover our unique and stylish collection of clothing, shoes, and
            accessories. Find the perfect items to elevate your style.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              href={category.link}
              key={index}
              className="relative group rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
            >
              <Image
                width={600}
                height={400}
                className="object-cover w-full h-64 md:h-80 lg:h-96"
                src={category.imageUrl}
                alt={category.altText}
                placeholder="blur"
                blurDataURL={category.blurDataURL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block cursor-pointer bg-white text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-gray-800 hover:text-white">
                  {category.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
