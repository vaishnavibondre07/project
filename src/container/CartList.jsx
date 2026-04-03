import { useCartState } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartList = () => {
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

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          onClick={() => navigate('/checkout')}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartList;

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