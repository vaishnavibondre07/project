import { use } from "react";
import { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import { useEffect } from "react";

// Initial state
const initialState = {
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
}

const cartReducer = (state = initialState, action) => {

  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cartItems.find((item) => item.id === action.payload.id)) return state;
      return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };

    case "DELETE_FROM_CART":
      return { ...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload) };

    case "INCREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        ),
      };

      case 'CLEAR_CART' : 
          return {
            ...state,
            cartItems: [],
          }

      

    default:
      return state;
  }
};

// Create contexts
const CartStateContext = createContext();
const CartActionsContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

  // Derived state
  const cartTotalPrice = useMemo(
    () => state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [state.cartItems]
  );

  // Memoized actions
  const addToCart = useCallback((product) => dispatch({ type: "ADD_TO_CART", payload: product }), []);

  const deleteFromCart = useCallback((id) => dispatch({ type: "DELETE_FROM_CART", payload: id }), []);

  const increaseQty = useCallback((id) => dispatch({ type: "INCREASE_QTY", payload: id }), []);

  const decreaseQty = useCallback((id) => dispatch({ type: "DECREASE_QTY", payload: id }), []);

  const clearCart = useCallback(() => dispatch({type: 'CLEAR_CART'}), [])

  const isCart = useCallback( (id) => state.cartItems.some(item => item.id === id), [state.cartItems]);

  // ANOTHER WAY 
  // const isCart = useCallback((id) => !!state.cartItems.find((item) => item.id === id), [state.cartItems]);

  return (
    <CartStateContext.Provider value={{ cartItems: state.cartItems, cartTotalPrice }}>
      <CartActionsContext.Provider value={{ addToCart, deleteFromCart, increaseQty, decreaseQty, isCart , clearCart}}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
};

// Custom hooks
export const useCartState = () => {
  const context = useContext(CartStateContext);
  if (!context) throw new Error("useCartState must be used within a CartProvider");
  return context;
};

export const useCartActions = () => {
  const context = useContext(CartActionsContext);
  if (!context) throw new Error("useCartActions must be used within a CartProvider");
  return context;
};

export const useCart = () => ({ ...useCartState(), ...useCartActions() });


// import { createContext, use, useContext, useEffect, useReducer } from "react";

// const CartContext = createContext();

// const initialState = {
//     cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
// }



// export const addToCart = (product) => ({
//     type: 'ADD_TO_CART',
//     payload: product
// })

// export const deleteFromCart = (id) => ({
//     type: 'DELETE_FROM_CART',
//     payload: id
// })

// export const increaseQty = (id) => ({
//     type: 'INCRESE_QTY',
//     payload: id
// })


// export const decreaseQty = (id) => ({
//     type: 'DECRESE_QTY',
//     payload: id
// })

// const cartReducer = (state = initialState, action) => {

//     switch (action.type) {
        
//         case 'ADD_TO_CART': {
//             const exist = state.cartItems.find(
//                 (item) => item.id === action.payload.id
//             )

//             if(exist) {
//                alert('Item already added in cart');
//                return state;
//             }

//             return {
//                 ...state,

//                 cartItems: [
//                     ...state.cartItems,
//                     {...action.payload, quantity: 1}
//                 ]
//             }

//         };

//         case 'DELETE_FROM_CART': {

//              return {
//                 ...state,
//                 cartItems: state.cartItems.filter(
//                     (item) => item.id !== action.payload
//                 ),
//              };

//         };

//         case 'INCRESE_QTY': {
//             return {
//               ...state,
//               cartItems: state.cartItems.map((item) =>
//                  item.id === action.payload
//                  ? { ...item, quantity: item.quantity + 1 }
//                  : item
//                )
//           };
//         }

//         case 'DECRESE_QTY' : {
//             return {
//                 ...state,
//                 cartItems: state.cartItems.map((item) => 
//                     item.id === action.payload  && item.quantity > 1
//                     ? {...item, quantity: item.quantity -1}
//                     : item
//                 )
//             }
//         };
            

//         default: 
//           return state;
//     }

// }

// export const CartProvider = ({children}) => {


//     const [state, dispatch] = useReducer(cartReducer, initialState);

//     useEffect(() => {
//         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
//     }, [state.cartItems]);

//     const cartTotalItems = state.cartItems.length;

//     const cartTotalPrice = state.cartItems.reduce(
//         (acc, item) => acc + ( item.price * item.quantity ), 0
//     );

//     const isCart = (id) => state.cartItems.some((item) => item.id === id);


// return (

//     <CartContext.Provider 
//        value = {
//         {
//             cartItems: state.cartItems,
//             dispatch,
//             cartTotalItems,
//             cartTotalPrice,
//             isCart,

//             addToCart,
//             deleteFromCart,
//             increaseQty,
//             decreaseQty
//         }
//        } >
//         {children}
//     </CartContext.Provider>

//  );

// };

// export const useCart = () => useContext(CartContext);