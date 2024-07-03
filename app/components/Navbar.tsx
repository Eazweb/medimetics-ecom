"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  isAdmin: boolean;
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { data: session } = useSession();
  const { toast } = useToast();

  const Admin =
    session && session.user ? (session.user as User).isAdmin : false;

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

  const router = useRouter();

  return (
    <>
      <div className="w-full p-1 text-center bg-gradient-to-r from-indigo-800 to-black">
        <span className="text-sm sm:text-sm tracking-widest font-semibold glowing-text">
          {messages[currentMessageIndex]}
        </span>
      </div>
      <nav className="bg-white border-b-2 md:border-none">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Image src="/logo.png" alt="logo" width={70} height={50} />
            <span className="md:text-lg font-semibold text-gray-900">
              Smart Shop
            </span>
          </Link>
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 m-2"
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
            className={`w-full md:flex md:w-auto ${
              isOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-200 md:flex-row md:space-x-8 md:mt-0 md:border-none md:bg-white">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-none md:hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-none md:hover:text-gray-700"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-none md:hover:text-gray-700"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  href={`${session && session?.user ? "/order" : "/login"}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-none md:hover:text-gray-700"
                >
                  Order
                </Link>
              </li>
              {Admin && (
                <li>
                  <Link
                    href={`${
                      session && session?.user ? "/dashboard" : "/login"
                    }`}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-none md:hover:text-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex items-center">
            {session && session?.user ? (
              <>
                <ShoppingBag
                  size={24}
                  className=" mx-2 cursor-pointer hover:text-gray-700"
                  onClick={() => {
                    router.push("/cart");
                    setIsOpen(false);
                  }}
                />
                <Button
                  className="m-2"
                  onClick={() => {
                    signOut({
                      callbackUrl: "/login",
                    });
                    toast({
                      title: "Success",
                      description: "Logged out successfully",
                      duration: 3000,
                      variant: "default",
                      style: {
                        backgroundColor: "#191919",
                        color: "#fff",
                      },
                    });
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" className=" items-center justify-center m-2">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
