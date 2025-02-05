import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface ProductState {
  name: string;
  price: number;
  description: string;
  mainImage: string[];
  otherImages: string[];
  userId: string;
  categories: string;
  sizes?: string[];
  colors?: string[];
}

const initialState: ProductState = {
  name: "",
  price: 0,
  description: "",
  mainImage: [],
  otherImages: [],
  userId: "",
  categories: "",
  sizes: [],
  colors: [],
};

export const CreatePro = createAsyncThunk(
  "product/create",
  async (productData: ProductState, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          mainImage: productData.mainImage[0] || "",
          otherImages: productData.otherImages[0] || "",
          userId: productData.userId,
          categories: productData.categories,
          sizes: productData.sizes || [],
          colors: productData.colors || [],
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product creation failed");
      }

      toast.success("Product created successfully");
      return data.product;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Product creation failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const CreateProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreatePro.pending, (state) => {
      // Optional: Add loading state handling
    });
    builder.addCase(CreatePro.fulfilled, (state, action) => {
      // Reset state or update as needed
      return initialState;
    });
    builder.addCase(CreatePro.rejected, (state, action) => {
      // Handle error state if needed
      console.error("Product creation failed:", action.payload);
    });
  },
});

export default CreateProductSlice.reducer;
