export const CartItem = ({ item, dispatch, deleteFromCart, increaseQty, decreaseQty }) => {

    console.log(item.price);
    
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
      
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-24 h-24 object-contain"
      />

      <div className="flex-1">
        <h2 className="font-semibold">{item.title}</h2>
        <p className="text-gray-500">${item.price}</p>

        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
        </div>
      </div>

      <button
        onClick={() => dispatch(deleteFromCart(item.id))}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
};