"use client";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ToastCartButton = ({ product }: any) => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const { toast } = useToast();
  const handleClick = () => {
    if (!session?.user) {
      toast({
        title: "Please login to add to cart",
        description: "You need to be logged in to add items to your cart",
        variant: "default",
        duration: 1500,
        style: {
          backgroundColor: "#191919",
          color: "#fff",
        },
      });
      return push("/login");
    } else {
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
    }
  };
  return (
    <button
      onClick={handleClick}
      className="mt-4 py-2 px-4 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-900  sm:w-auto"
    >
      <ShoppingCart className="w-6 h-6 sm:w-5 sm:h-5 md:mr-2" />
      <span className="hidden sm:block">Add to Cart</span>
    </button>
  );
};

export default ToastCartButton;
