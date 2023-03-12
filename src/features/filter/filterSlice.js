import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    loadProducts(state, { payload }) {
      let maxPrice = payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: payload,
        filtered_products: payload,
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    },
    setGridView(state, { payload }) {
      state.grid_view = payload;
    },

    updateSort(state, { payload }) {
      state.sort = payload;
    },

    sortProducts(state) {
      const { sort, filtered_products } = state;
      if (filtered_products.length < 1) return;
      let tempProducts = [...filtered_products];
      switch (sort) {
        case "price-highest":
          tempProducts = tempProducts.sort((a, b) => b.price - a.price);
          break;
        case "name-a":
          tempProducts = tempProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "name-z":
          tempProducts = tempProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        default:
          tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      state.filtered_products = tempProducts;
    },
    updateFilters(state, { payload }) {
      state.filters = { ...state.filters, [payload.name]: payload.value };
    },
    clearFilters(state) {
      state.filters = {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      };
    },
    filterProducts(state) {
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let tempProducts = [...all_products];

      // filtering

      // text
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text.toLowerCase());
        });
      }

      // category
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }

      // company
      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }

      // color
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) =>
          product.colors.some((c) => c === color)
        );
      }

      // price
      tempProducts = tempProducts.filter((product) => product.price <= price);

      // shipping
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }

      state.filtered_products = tempProducts;
    },
  },
});

export default filterSlice.reducer;
export const {
  loadProducts,
  setGridView,
  updateSort,
  sortProducts,
  updateFilters,
  clearFilters,
  filterProducts,
} = filterSlice.actions;
