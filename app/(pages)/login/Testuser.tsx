import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { FiCopy } from "react-icons/fi";

const TestUser = () => {
  const { toast } = useToast();
  const userInfo = {
    email: "rk0001945@gmail.com",
    password: "Password123@",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Copied to clipboard",
      duration: 3000,
      style: {
        backgroundColor: "#191919",
        color: "#fff",
      },
    });
  };

  return (
    <div className="flex flex-col mt-5 space-y-4 p-4 max-w-sm mx-auto bg-black/20 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-gray-900 font-medium">
          Login ID: {userInfo.email}
        </span>
        <FiCopy
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={() => copyToClipboard(userInfo.email)}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-900 font-medium">
          Password: {"*".repeat(userInfo.password.length)}
        </span>
        <FiCopy
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={() => copyToClipboard(userInfo.password)}
        />
      </div>
    </div>
  );
};

export default TestUser;
