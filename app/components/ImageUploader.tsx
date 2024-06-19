"use client";
import { UploadButton } from "@/utils/uploadthing";
import React from "react";

const ImageUpload: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="p-8 max-w-lg w-full bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Image Uploader
        </h2>
        <div className="mb-4 text-center">
          <p className="text-gray-600">Please select an image to upload.</p>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
