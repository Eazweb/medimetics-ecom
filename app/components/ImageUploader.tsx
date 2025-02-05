"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  url: (urls: string[]) => void;
  multiple?: boolean;
  value?: string[];
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

const ImageUpload: FC<ImageUploadProps> = ({
  url,
  multiple = false,
  value = [],
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<string[]>(value);

  useEffect(() => {
    // Add the Cloudinary widget script
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpload = () => {
    if (typeof window === "undefined" || !window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "ml_default",
        folder: "ecommerce",
        multiple: multiple,
        maxFiles: multiple ? 4 : 1,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          const newUrl = result.info.secure_url;
          if (multiple) {
            const updatedImages = [...images, newUrl].slice(0, 4);
            setImages(updatedImages);
            url(updatedImages);
          } else {
            setImages([newUrl]);
            url([newUrl]);
          }
          setIsUploading(false);
        }
        if (error) {
          console.error("Upload error:", error);
          alert("Error uploading image");
          setIsUploading(false);
        }
        if (result.event === "close") {
          setIsUploading(false);
        }
      }
    );

    setIsUploading(true);
    widget.open();
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    url(updatedImages);
  };

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="p-8 max-w-lg w-full bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Image Uploader
        </h2>
        <div className="mb-4 text-center">
          {multiple ? (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="relative aspect-square border rounded-lg overflow-hidden"
                  >
                    {images[index] ? (
                      <>
                        <Image
                          src={images[index]}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <span className="text-gray-400">
                          Optional Image {index + 1}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="mb-4">
              {images[0] ? (
                <div className="relative w-full aspect-square mb-4">
                  <Image
                    src={images[0]}
                    alt="Product main image"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(0)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-full aspect-square mb-4 border rounded-lg flex items-center justify-center bg-gray-50">
                  <span className="text-gray-400">No image selected</span>
                </div>
              )}
            </div>
          )}
          <Button
            onClick={handleUpload}
            disabled={isUploading || (multiple ? images.length >= 4 : false)}
            className="cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              `Upload ${multiple ? "Images" : "Image"}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
