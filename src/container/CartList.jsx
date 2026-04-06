import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { cartTotalPrice } from "../features/cartSlice";

const CartList = () => {

  const navigate = useNavigate();


  const { cartItems } = useSelector((state) => state.cart);
  const total = useSelector(cartTotalPrice);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))
      )}

      <h2 className="text-right mt-5 text-xl font-bold">
        Total: ₹ {total.toFixed(2)}
      </h2>

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed mt-5"
          disabled={cartItems.length === 0}
          onClick={() => navigate('/checkout')}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartList;