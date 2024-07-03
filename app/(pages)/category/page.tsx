import CateComp from "@/app/components/CateComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
  description: "Category page",
};

const Category = () => {
  return <CateComp />;
};

export default Category;
