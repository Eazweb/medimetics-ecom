"use client";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const Auth = false;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const messages = [
    "Free shipping on orders over ₹399!",
    "20% off your first purchase!",
    "New arrivals every week!",
    "Exclusive deals for members only!",
    "Shop the latest trends with us!",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [messages.length]);
  return (
    <>
      <span className="w-full p-1 text-center bg-gradient-to-r from-indigo-800 to-black block rtl:from-indigo-800 rtl:to-black">
        <span className="text-sm sm:text-sm tracking-widest font-semibold glowing-text">
          {messages[currentMessageIndex]}
        </span>
      </span>
      <nav className="bg-white border-2 md:border-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <Link
            href="/"
            className="flex items-center  rtl:space-x-reverse"
            onClick={() => setIsOpen(false)}
          >
            <Image src="/logo.png" alt="logo" width={70} height={50} />
            <span className="md:text-lg font-semibold text-gray-900">
              Smart Shop
            </span>
          </Link>

          <button
            onClick={toggleDropdown}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex mx-4 border-2 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${isOpen ? "" : "hidden"}`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0  "
                  aria-current="page"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 "
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 "
                >
                  Category
                </Link>
              </li>

              <li>
                <Link
                  href="/order"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 "
                >
                  Order
                </Link>
              </li>
              {!Auth ? (
                <li>
                  <Link
                    href={"/login"}
                    className="md:hidden inline-flex items-center justify-center w-full my-2"
                  >
                    <Button className="w-full">Login</Button>
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>

          {!Auth ? (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center justify-center mx-2"
            >
              <Button>Login</Button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
