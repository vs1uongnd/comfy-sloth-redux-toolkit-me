import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

export const removeLocalStorage = () => {
  localStorage.removeItem("cart");
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const { id, color, amount, product } = payload;
      const tempItem = state.cart.find((i) => i.id === id + color);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    removeItem(state, { payload }) {
      const tempCart = state.cart.filter((item) => item.id !== payload);
      state.cart = tempCart;
    },
    toggleAmount(state, { payload }) {
      const { id, type } = payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (type === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (type === "dec") {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });
      state.cart = tempCart;
    },
    countCartTotals(state) {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      state.total_items = total_items;
      state.total_amount = total_amount;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  clearCart,
  removeItem,
  toggleAmount,
  countCartTotals,
} = cartSlice.actions;
