import Productstable from "@/app/_dashboardComponents/Productstable";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "dashboard Products Page",
  description: "This is the dashboard products page",
};

const DashboardProducts = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/dashboard/products/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
      <Productstable />
    </div>
  );
};

export default DashboardProducts;
