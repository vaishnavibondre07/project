import { useCartState } from "../context/CartContext";
import { CartItem } from "../components/CartItem";
import { useNavigate } from "react-router-dom";

export const CartList = () => {
  const { cartItems, cartTotalPrice } = useCartState();

  const navigate = useNavigate();

  if (!cartItems.length) {
    return (
      <div className="max-w-4xl mx-auto p-5 text-center text-gray-500">
        <h1 className="text-2xl font-bold mb-5">Your Cart is Empty</h1>
      </div>
    );
  }

  const formattedTotal = cartTotalPrice.toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <h2 className="text-right mt-5 text-xl font-bold">
        Total: ₹ {formattedTotal}
      </h2>

      <button onClick={() => navigate('/checkout')}>
        PLACE ORDER
      </button>
    </div>
  );
};


// import { useCart } from "../context/CartContext";
// import { CartItem } from "../components/CartItem";

// export const CartList = () => {
//   const {
//     cartItems,
//     dispatch,
//     deleteFromCart,
//     increaseQty,
//     decreaseQty,
//     cartTotalPrice,
//   } = useCart();

//   console.log(cartItems);
  
  

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

//       {cartItems.map((item) => (
//         <CartItem
//           key={item.id}
//           item={item}
//           dispatch={dispatch}
//           deleteFromCart={deleteFromCart}
//           increaseQty={increaseQty}
//           decreaseQty={decreaseQty}
//         />
//       ))}



//       <h2 className="text-right mt-5 text-xl font-bold">
//         Total: ${cartTotalPrice.toFixed(2)}
//       </h2>
//     </div>
//   );
// };