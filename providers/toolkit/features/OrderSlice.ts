import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface createOrderState {
  userId: string;
  quantity: number;
  productId: string;
  addressId: string;
}
const initialState: createOrderState = {
  userId: "",
  quantity: 0,
  productId: "",
  addressId: "",
};
export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData: createOrderState, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: orderData?.userId,
          quantity: orderData?.quantity,
          productId: orderData?.productId,
          addressId: orderData?.addressId,
        }),
      });
      if (!response.ok) {
        throw new Error("Order creation failed");
      }
      const order = await response.json();
      if (order.message === "Order created successfully") {
        return order;
      } else {
        rejectWithValue(order.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});
export default createOrderSlice.reducer;
