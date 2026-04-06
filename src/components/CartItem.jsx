import React from "react";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, deleteFromCart } from "../features/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="w-24 h-24 object-contain"
      />

      <div className="flex-1">
        <h2 className="font-semibold">{item.title}</h2>
        <p className="text-gray-600">₹ {item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            disabled={item.quantity <= 1}
            onClick={() => dispatch(decreaseQty(item.id))}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            −
          </button>

          <span className="px-2">{item.quantity}</span>

          <button
            onClick={() => dispatch(increaseQty(item.id))}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => dispatch(deleteFromCart(item.id))}
        className="text-red-500 font-medium hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

export default React.memo(CartItem);


// import { useDispatch, useSelector } from "react-redux";
// import { decreaseQty, increaseQty, deleteFromCart } from "../features/cartSlice";
// const CartItem = ({ item }) => {
//   const dispatch = useDispatch();

//   return (
//     <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
      
//       <img
//         src={item.thumbnail}
//         alt={item.title}
//         className="w-24 h-24 object-contain"
//       />

//       <div className="flex-1">
//         <h2 className="font-semibold">{item.title}</h2>
//         <p className="text-gray-500">₹ {item.price.toFixed(2)}</p>

//         <div className="flex items-center gap-2 mt-2">
//           <button
//             onClick={() => dispatch(decreaseQty(item.id))}
//             className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             −
//           </button>
//           <span className="px-2">{item.quantity}</span>
//           <button
//             onClick={() => dispatch(increaseQty(item.id))}
//             className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             +
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={() => dispatch(deleteFromCart(item.id))}
//         className="text-red-500 font-medium hover:underline"
//       >
//         Remove
//       </button>
//     </div>
//   );
// };

// export default CartItem;


// export const CartItem = ({ item, dispatch, deleteFromCart, increaseQty, decreaseQty }) => {

//     console.log(item.price);
    
//   return (
//     <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
      
//       <img
//         src={item.thumbnail}
//         alt={item.title}
//         className="w-24 h-24 object-contain"
//       />

//       <div className="flex-1">
//         <h2 className="font-semibold">{item.title}</h2>
//         <p className="text-gray-500">${item.price}</p>

//         <div className="flex items-center gap-2 mt-2">
//           <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
//           <span>{item.quantity}</span>
//           <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
//         </div>
//       </div>

//       <button
//         onClick={() => dispatch(deleteFromCart(item.id))}
//         className="text-red-500"
//       >
//         Remove
//       </button>
//     </div>
//   );
// };