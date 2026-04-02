import { useCart } from "../context/CartContext";
import React from "react";

export const ProductCard = React.memo(({ productData, onClick, }) => {
  const { addToCart, isCart } = useCart(); 

  const inCart = isCart(productData.id);
  return (
    <li
      onClick={onClick}
      className="bg-white rounded-2xl h-full shadow-md hover:shadow-xl transition duration-300 overflow-hidden p-4 flex flex-col gap-3"
    >
      <figure className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={productData.thumbnail}
          loading="lazy"
          alt={productData.title}
          className="h-full object-contain hover:scale-105 transition duration-300"
        />
      </figure>

      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{productData.title}</h2>
      <p className="text-sm text-gray-500">
        Category: <span className="text-gray-700">{productData.category}</span>
      </p>
      <p className="text-xl font-bold text-green-600">₹ {productData.price.toFixed(2)}</p>
      <p className="text-sm text-red-500">Discount: {productData.discountPercentage}%</p>
      <p className="text-sm text-yellow-500 font-medium">⭐ {productData.rating}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(productData); 
        }}
        disabled={inCart}
        className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {inCart? "Added to Cart" : "Add to Cart"}
      </button>
    </li>
  );
});



// import { useCart } from "../context/CartContext";

// export const ProductCard = ({ productData, onClick }) => {
//   const { addToCart , dispatch, isCart, } = useCart();



//   return (

//     <div onClick={onClick} >

//       <li className="bg-white rounded-2xl h-full shadow-md hover:shadow-xl transition duration-300 overflow-hidden p-4 flex flex-col gap-3">
        
//         <figure className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
//           <img
//           src={productData.thumbnail}
//           alt={productData.title}
//           className="h-full object-contain hover:scale-105 transition duration-300"
//         />
//       </figure>

//       <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
//         {productData.title}
//       </h2>

//       <p className="text-sm text-gray-500">
//         Category: <span className="text-gray-700">{productData.category}</span>
//       </p>

//       <p className="text-xl font-bold text-green-600">
//         ${productData.price.toFixed(2)}
//       </p>

//       <p className="text-sm text-red-500">
//         Discount: {productData.discountPercentage}%
//       </p>

//       <p className="text-sm text-yellow-500 font-medium">
//         ⭐ {productData.rating}
//       </p>

//       <button onClick={(e) => {
//                             e.stopPropagation();
//                             dispatch(addToCart(productData));
//                           }}
//               disabled={isCart(productData.id)}
//              className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
//         {isCart(productData.id) ? "Added to Cart" : "Add to Cart"}
//       </button>

//     </li>
//   </div>
//   );
// };
