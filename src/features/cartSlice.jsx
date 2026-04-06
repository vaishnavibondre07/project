import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      
        state.cartItems.push({ ...action.payload, quantity: 1 });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },


    clearCart: (state) => {
      state.cartItems = [];
      // localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  deleteFromCart,
  clearCart,
} = cartSlice.actions;

// ✅ SELECTORS (IMPORTANT — you missed this earlier)
export const selectCartItems = (state) => state.cart.cartItems;

export const cartTotalPrice = (state) => state.cart.cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

export default cartSlice.reducer;












// import { createSlice } from "@reduxjs/toolkit";

// // 🔥 Load from localStorage
// const loadCartFromStorage = () => {
//   try {
//     const data = localStorage.getItem("cartItems");
//     return data ? JSON.parse(data) : [];
//   } catch {
//     return [];
//   }
// };

// // 🔥 Save to localStorage
// const saveCartToStorage = (cartItems) => {
//   try {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   } catch {
//     console.log("Error saving cart");
//   }
// };

// const initialState = {
//   cartItems: loadCartFromStorage(),
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // ✅ ADD
//     addToCart: (state, action) => {
//       const existing = state.cartItems.find(
//         (item) => item.id === action.payload.id
//       );

//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }

//       saveCartToStorage(state.cartItems);
//     },

//     // ✅ DELETE
//     deleteFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(
//         (item) => item.id !== action.payload
//       );

//       saveCartToStorage(state.cartItems);
//     },

//     // ✅ INCREASE
//     increaseQty: (state, action) => {
//       const item = state.cartItems.find(
//         (i) => i.id === action.payload
//       );

//       if (item) {
//         item.quantity += 1;
//       }

//       saveCartToStorage(state.cartItems);
//     },

//     // ✅ DECREASE
//     decreaseQty: (state, action) => {
//       const item = state.cartItems.find(
//         (i) => i.id === action.payload
//       );

//       if (item) {
//         if (item.quantity > 1) {
//           item.quantity -= 1;
//         } else {
//           // optional: remove if qty = 1
//           state.cartItems = state.cartItems.filter(
//             (i) => i.id !== action.payload
//           );
//         }
//       }

//       saveCartToStorage(state.cartItems);
//     },

//     // ✅ CLEAR
//     clearCart: (state) => {
//       state.cartItems = [];
//       saveCartToStorage([]);
//     },
//   },
// });

// // ✅ EXPORT ACTIONS
// export const {
//   addToCart,
//   deleteFromCart,
//   increaseQty,
//   decreaseQty,
//   clearCart,
// } = cartSlice.actions;

// // ✅ EXPORT REDUCER
// export default cartSlice.reducer;

// // ✅ SELECTORS
// export const selectCartItems = (state) => state.cart.cartItems;

// export const selectCartTotal = (state) =>
//   state.cart.cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existing = state.cartItems.find(
//         (item) => item.id === action.payload.id
//       );

//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }
//     },

//     deleteFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(
//         (item) => item.id !== action.payload
//       );
//     },

//     clearCart: (state) => {
//       state.cartItems = [];
//     },
//   },
// });

// // ✅ Export actions
// export const { addToCart, deleteFromCart, clearCart } =
//   cartSlice.actions;

// // ✅ Export reducer
// export default cartSlice.reducer;

// // ✅ Export selectors (THIS WAS MISSING 🚨)
// export const selectCartItems = (state) => state.cart.cartItems;

// export const selectCartTotal = (state) =>
//   state.cart.cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );