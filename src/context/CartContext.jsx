import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = {
    cartItems : [],
}

export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product
})

export const deleteFromCart = (id) => ({
    type: 'DELETE_FROM_CART',
    payload: id
})

export const increaseQty = (id) => ({
    type: 'INCRESE_QTY',
    payload: id
})


export const decreaseQty = (id) => ({
    type: 'DECRESE_QTY',
    payload: id
})

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case 'ADD_TO_CART': {
            const exist = state.cartItems.find(
                (item) => item.id === action.payload.id
            )

            if(exist) {
               alert('Item already added in cart');
               return state;
            }

            return {
                ...state,

                cartItems: [
                    ...state.cartItems,
                    {...action.payload, quantity: 1}
                ]
            }

        };

        case 'DELETE_FROM_CART': {

             return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
             };

        };

        case 'INCRESE_QTY': {
            return {
              ...state,
              cartItems: state.cartItems.map((item) =>
                 item.id === action.payload
                 ? { ...item, quantity: item.quantity + 1 }
                 : item
               )
          };
        }

        case 'DECRESE_QTY' : {
            return {
                ...state,
                cartItems: state.cartItems.map((item) => 
                    item.id === action.payload  && item.quantity > 1
                    ? {...item, quantity: item.quantity -1}
                    : item
                )
            }
        };
            

        default: 
          return state;
    }

}

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const cartTotalItems = state.cartItems.length;

    const cartTotalPrice = state.cartItems.reduce(
        (acc, item) => acc + ( item.price * item.quantity ), 0
    );

    const isCart = (id) => state.cartItems.some((item) => item.id === id);


return (

    <CartContext.Provider 
       value = {
        {
            cartItems: state.cartItems,
            dispatch,
            cartTotalItems,
            cartTotalPrice,
            isCart,

            addToCart,
            deleteFromCart,
            increaseQty,
            decreaseQty
        }
       } >
        {children}
    </CartContext.Provider>

 );

};

export const useCart = () => useContext(CartContext);