import { useCart } from "../context/CartContext";
import { CartItem } from "../components/CartItem";

export const CartList = () => {
  const {
    cartItems,
    dispatch,
    deleteFromCart,
    increaseQty,
    decreaseQty,
    cartTotalPrice,
  } = useCart();

  console.log(cartItems);
  
  

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          dispatch={dispatch}
          deleteFromCart={deleteFromCart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
        />
      ))}



      <h2 className="text-right mt-5 text-xl font-bold">
        Total: ${cartTotalPrice.toFixed(2)}
      </h2>
    </div>
  );
};