import { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import { useEffect } from "react";

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

const CartStateContext = createContext();
const CartActionsContext = createContext();


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);


  const cartTotalPrice = useMemo(
    () => state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [state.cartItems]
  );

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

