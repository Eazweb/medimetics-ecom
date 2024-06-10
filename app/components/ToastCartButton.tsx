"use client";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from "lucide-react";

const ToastCartButton = ({ product }: any) => {
  const { toast } = useToast();
  const handleClick = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} was added to your cart`,
      variant: "default",
      duration: 1500,
      style: {
        backgroundColor: "#191919",
        color: "#fff",
      },
    });
  };
  return (
    <button
      onClick={handleClick}
      className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 w-full sm:w-auto"
    >
      <ShoppingCart className="w-6 h-6 sm:w-5 sm:h-5 mr-2" />
      <span className="hidden sm:block">Add to Cart</span>
    </button>
  );
};

export default ToastCartButton;
