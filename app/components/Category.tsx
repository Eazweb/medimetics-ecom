import { Link } from "next-view-transitions";
import Image from "next/image";
import React from "react";

const categories = [
  {
    label: "Men",
    imageUrl:
      "https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png",
    altText: "men-image",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  },
  {
    label: "Women",
    imageUrl:
      "https://i.ibb.co/PTtRBLL/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png",
    altText: "women-image",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  },
  {
    label: "Children",
    imageUrl:
      "https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png",
    altText: "children-image",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
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
            <div
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
                <Link
                  href="/"
                  className="inline-block bg-white text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-gray-800 hover:text-white"
                >
                  {category.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
