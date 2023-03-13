import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsThunk } from "./productsThunk";
import { fetchSingleProductThunk } from "./singleProductThunk";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  fetchProductsThunk
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  fetchSingleProductThunk
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
    showLoading: (state) => {
      state.products_loading = true;
    },
    hideLoading: (state) => {
      state.products_loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products_loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products_loading = false;
        state.featured_products = payload
          .filter((product) => product.featured === true)
          .slice(0, 3);
        state.products = payload;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.products_loading = false;
        state.products_error = payload;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.single_product_loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
        state.single_product_loading = false;
        state.single_product = payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, { payload }) => {
        state.single_product_loading = false;
        state.single_product_error = payload;
      });
  },
});

export default productsSlice.reducer;
export const { openSidebar, closeSidebar, showLoading, hideLoading } =
  productsSlice.actions;
