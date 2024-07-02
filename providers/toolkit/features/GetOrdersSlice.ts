import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const GetOrders = createAsyncThunk(
  "getOrders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/get-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const orders = await response.json();
      return orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const GetOrdersSlice = createSlice({
  name: "getOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
});

export default GetOrdersSlice.reducer;
