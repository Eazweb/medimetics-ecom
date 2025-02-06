"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";
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
  const router = useRouter();

  const Admin = session?.user ? (session.user as User).isAdmin : false;

  const messages = [
    "Free shipping on ordering 3 items!",
    "Free shipping on all combos!",
    "New arrivals every week!",
    "Exclusive deals for members only!",
    "Shop the best products with us!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 transition-colors duration-200"
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="w-full p-2 text-center bg-gradient-to-r from-indigo-800 to-black">
        <span className="text-xs sm:text-sm tracking-widest font-semibold text-white animate-pulse">
          {messages[currentMessageIndex]}
        </span>
      </div>
      <nav className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={300}
              height={300}
              className="w-auto h-8 sm:h-10"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Shop</NavLink>
            {/* <NavLink href="/category">Category</NavLink> */}
            <NavLink href={session?.user ? "/order" : "/login"}>Order</NavLink>
            {Admin && (
              <NavLink href={session?.user ? "/dashboard" : "/login"}>
                Dashboard
              </NavLink>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <ShoppingBag
                  size={24}
                  className="cursor-pointer hover:text-gray-700 transition-colors duration-200"
                  onClick={() => {
                    router.push("/cart");
                    setIsOpen(false);
                  }}
                />
                <Button
                  className="hidden md:inline-flex"
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                    toast({
                      title: "Success",
                      description: "Logged out successfully",
                      duration: 3000,
                      variant: "default",
                      style: { backgroundColor: "#191919", color: "#fff" },
                    });
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" className="hidden md:inline-flex">
                <Button>Login</Button>
              </Link>
            )}
            <button
              onClick={toggleDropdown}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/products">Shop</NavLink>
              <NavLink href="/category">Category</NavLink>
              <NavLink href={session?.user ? "/order" : "/login"}>
                Order
              </NavLink>
              {Admin && (
                <NavLink href={session?.user ? "/dashboard" : "/login"}>
                  Dashboard
                </NavLink>
              )}
              {session?.user ? (
                <Button
                  className="w-full text-left"
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                    toast({
                      title: "Success",
                      description: "Logged out successfully",
                      duration: 3000,
                      variant: "default",
                      style: { backgroundColor: "#191919", color: "#fff" },
                    });
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Link href="/login" className="block">
                  <Button className="w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
