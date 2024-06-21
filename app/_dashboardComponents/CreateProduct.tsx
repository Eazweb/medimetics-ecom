"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ImageUpload from "../components/ImageUploader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

type Size = {
  size: string[];
};
type Color = {
  color: { color: string; colorCode: string }[];
};
const CreateProduct = () => {
  const [sizeSelection, setSizeSelection] = useState("no");
  const [colorSelection, setColorSelection] = useState<string>("no");

  const sizes: Size = {
    size: ["S", "M", "L", "XL", "XXL"],
  };
  const colors: Color = {
    color: [
      { color: "Red", colorCode: "#FF0000" },
      { color: "Green", colorCode: "#008000" },
      { color: "Blue", colorCode: "#0000FF" },
      { color: "Yellow", colorCode: "#FFFF00" },
      { color: "Black", colorCode: "#000000" },
      { color: "White", colorCode: "#FFFFFF" },
    ],
  };

  const handleSizeChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    setSizeSelection(target.value);
  };

  const handleColorChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    setColorSelection(target.value);
  };
  return (
    <div className="flex items-center justify-center p-5 flex-col bg-gray-200">
      <h1 className="text-2xl font-semibold text-start w-full my-5">
        Create Product
      </h1>
      <div className="w-full flex justify-end my-5">
        <Button>Save Product</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Fill in the details of the product you want to create.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                placeholder="Enter product name"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="min-h-32"
                placeholder="Enter product description"
              />
            </div>
          </div>
        </CardContent>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category" aria-label="Select category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="man">Man</SelectItem>
                  <SelectItem value="woman">Woman</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="size">Size</Label>
              <div className="flex items-center justify-start gap-2 w-full">
                <RadioGroup
                  defaultValue="no"
                  onClick={handleSizeChange}
                  className="flex items-center justify-start gap-2 w-full"
                >
                  <RadioGroupItem value="no" id="size-no" />
                  <Label htmlFor="size-no">No</Label>

                  <RadioGroupItem value="yes" id="size-yes" />
                  <Label htmlFor="size-yes">Yes</Label>
                </RadioGroup>
              </div>
              {sizeSelection === "yes" && (
                <span className="flex text-sm gap-2 text-gray-400">
                  {sizes.size.map((size) => (
                    <p key={size}>
                      {size}
                      {","}
                    </p>
                  ))}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
              <Label htmlFor="price">
                Price
                <span className="text-gray-500 text-sm"> (in INR)</span>
              </Label>
              <Input
                id="price"
                type="number"
                className="w-full"
                placeholder="Enter product price"
                minLength={1}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center justify-start gap-2 w-full">
                <RadioGroup
                  defaultValue="no"
                  onClick={handleColorChange}
                  className="flex items-center justify-start gap-2 w-full"
                >
                  <RadioGroupItem value="no" id="color-no" />
                  <Label htmlFor="color-no">No</Label>

                  <RadioGroupItem value="yes" id="color-yes" />
                  <Label htmlFor="color-yes">Yes</Label>
                </RadioGroup>
              </div>
              {colorSelection === "yes" && (
                <span className="flex text-sm gap-2 text-gray-400">
                  {colors.color.map((color, idx) => (
                    <p key={idx}>{color.color}</p>
                  ))}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardContent>
          <div className="grid gap-3">
            <Label htmlFor="image">
              Main Image
              <span className="text-gray-500 text-sm"> (4MB max)</span>
            </Label>
            <ImageUpload />
          </div>
        </CardContent>
        <CardContent>
          <div className="grid gap-3">
            <Label htmlFor="images">
              Other Images
              <span className="text-gray-500 text-sm"> (4MB max)</span>
            </Label>
            <ImageUpload />
          </div>
        </CardContent>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3 text-black"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduct;
