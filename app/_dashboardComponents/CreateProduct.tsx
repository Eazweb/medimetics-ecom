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
import { useForm } from "react-hook-form";

type Size = {
  size: string[];
};

type Color = {
  color: { color: string; colorCode: string }[];
};

type FormData = {
  name: string;
  description: string;
  category: string;
  price: number;
  selectedSizes: string[];
  selectedColors: string[];
};

const CreateProduct = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showSizes, setShowSizes] = useState<boolean>(false);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const handleSizeSelection = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorSelection = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const onSubmit = (data: FormData) => {
    console.log({ ...data, selectedSizes, selectedColors, category });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center p-5 flex-col bg-gray-200"
    >
      <h1 className="text-2xl font-semibold text-start w-full my-5">
        Create Product
      </h1>
      <div className="w-full flex justify-end my-5">
        <CardContent>
          <Button type="submit">Save Product</Button>
        </CardContent>
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
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-500">Name is required.</p>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="min-h-32"
                placeholder="Enter product description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500">Description is required.</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Select
                {...register("category")}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger id="category" aria-label="Select category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="man">Man</SelectItem>
                  <SelectItem value="woman">Woman</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500">Category is required.</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="size">Size</Label>
              <div className="flex items-center justify-start gap-2 w-full">
                <RadioGroup
                  defaultValue="no"
                  onValueChange={(value) => setShowSizes(value === "yes")}
                  className="flex items-center justify-start gap-2 w-full"
                >
                  <RadioGroupItem value="no" id="size-no" />
                  <Label htmlFor="size-no">No</Label>

                  <RadioGroupItem value="yes" id="size-yes" />
                  <Label htmlFor="size-yes">Yes</Label>
                </RadioGroup>
              </div>
              {showSizes && (
                <div>
                  {sizes.size.map((size) => (
                    <div key={size}>
                      <input
                        type="checkbox"
                        id={`size-${size}`}
                        value={size}
                        onChange={() => handleSizeSelection(size)}
                        checked={selectedSizes.includes(size)}
                      />
                      <label htmlFor={`size-${size}`}>{size}</label>
                    </div>
                  ))}
                </div>
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
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500">Price is required.</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center justify-start gap-2 w-full">
                <RadioGroup
                  defaultValue="no"
                  onValueChange={(value) => setShowColors(value === "yes")}
                  className="flex items-center justify-start gap-2 w-full"
                >
                  <RadioGroupItem value="no" id="color-no" />
                  <Label htmlFor="color-no">No</Label>

                  <RadioGroupItem value="yes" id="color-yes" />
                  <Label htmlFor="color-yes">Yes</Label>
                </RadioGroup>
              </div>
              {showColors && (
                <div>
                  {colors.color.map((color, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        id={`color-${color.color}`}
                        value={color.color}
                        onChange={() => handleColorSelection(color.color)}
                        checked={selectedColors.includes(color.color)}
                      />
                      <label htmlFor={`color-${color.color}`}>
                        {color.color}
                      </label>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          backgroundColor: color.colorCode,
                        }}
                      ></span>
                    </div>
                  ))}
                </div>
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
    </form>
  );
};

export default CreateProduct;
