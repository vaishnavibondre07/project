import { useGetDetailsQuery } from "../api/productApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../features/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const productId = Number(id); // ✅ FIX: convert to number

  const { data, isLoading, error } = useGetDetailsQuery(id);

  const cartItems = useSelector((state) => state.cart.cartItems);

  // ✅ FIX: correct check
  const isInCart = cartItems.some((item) => item.id === productId);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (data?.images?.length) {
      setSelectedImage(data.images[0]);
    }
  }, [data]);

  // ✅ Loading & Error Handling
  if (isLoading)
    return <p className="text-center mt-10 text-lg">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        {error?.message || "Something went wrong"}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT: IMAGES */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-100 rounded-2xl p-6 flex justify-center items-center shadow-md">
            <img
              src={selectedImage}
              alt={data?.title}
              className="h-96 object-contain hover:scale-105 transition"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {data?.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 object-contain border rounded-lg cursor-pointer transition
                ${
                  selectedImage === img
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "hover:border-blue-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {data?.title}
          </h1>

          <p className="text-yellow-500 text-lg">
            ⭐ {data?.rating} / 5
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-600">
              ₹ {data?.price}
            </p>

            {data?.price && data?.discountPercentage && (
              <p className="line-through text-gray-400">
                ₹{" "}
                {(
                  data.price /
                  (1 - data.discountPercentage / 100)
                ).toFixed(2)}
              </p>
            )}

            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
              {data?.discountPercentage}% OFF
            </span>
          </div>

          <p className="text-gray-600">{data?.description}</p>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <p><strong>Brand:</strong> {data?.brand}</p>
            <p><strong>Category:</strong> {data?.category}</p>
            <p><strong>Stock:</strong> {data?.availabilityStatus}</p>
            <p><strong>Shipping:</strong> {data?.shippingInformation}</p>
          </div>

          {/* ✅ FIXED CART BUTTON */}
          <div className="flex gap-4 mt-4">
            {isInCart ? (
              <button
                onClick={() => dispatch(deleteFromCart(productId))}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
              >
                Remove From Cart
              </button>
            ) : (
              <button
                onClick={() => dispatch(addToCart(data))}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>{data?.warrantyInformation}</p>
            <p>{data?.returnPolicy}</p>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {data?.reviews?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <p className="text-yellow-500">
                ⭐ {item.rating}
              </p>
              <p className="text-gray-700 my-2">
                {item.comment}
              </p>
              <p className="text-sm text-gray-500">
                — {item.reviewerName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;



// import { useGetDetailsQuery } from "../api/productApi";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, deleteFromCart, inCart } from "../features/cartSlice";

// const ProductDetails = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const { data, isLoading, error } = useGetDetailsQuery(id);

//   const cartItems = useSelector((state) => state.cart.cartItems);

//   // ✅ Optimized: boolean instead of function
//   const inCart = cartItems.some((item) => item.id === id);

//   const [selectedImage, setSelectedImage] = useState("");

//   useEffect(() => {
//     if (data?.images?.length) {
//       setSelectedImage(data.images[0]);
//     }
//   }, [data]);

//   // ✅ Loading & Error Handling
//   if (isLoading)
//     return <p className="text-center mt-10 text-lg">Loading...</p>;

//   if (error)
//     return (
//       <p className="text-center mt-10 text-red-500">
//         {error?.message || "Something went wrong"}
//       </p>
//     );

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="grid md:grid-cols-2 gap-10">

//         {/* LEFT: IMAGES */}
//         <div className="flex flex-col gap-4">
//           <div className="bg-gray-100 rounded-2xl p-6 flex justify-center items-center shadow-md">
//             <img
//               src={selectedImage}
//               alt={data?.title}
//               className="h-96 object-contain hover:scale-105 transition"
//             />
//           </div>

//           <div className="flex gap-3 overflow-x-auto">
//             {data?.images?.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt="thumb"
//                 onClick={() => setSelectedImage(img)}
//                 className={`h-20 w-20 object-contain border rounded-lg cursor-pointer transition
//                 ${
//                   selectedImage === img
//                     ? "border-blue-500 ring-2 ring-blue-300"
//                     : "hover:border-blue-400"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: DETAILS */}
//         <div className="flex flex-col gap-4">
//           <h1 className="text-3xl font-bold text-gray-800">
//             {data?.title}
//           </h1>

//           <p className="text-yellow-500 text-lg">
//             ⭐ {data?.rating} / 5
//           </p>

//           {/* PRICE */}
//           <div className="flex items-center gap-4">
//             <p className="text-3xl font-bold text-green-600">
//               ₹ {data?.price}
//             </p>

//             {/* ✅ Safe discount calculation */}
//             {data?.price && data?.discountPercentage && (
//               <p className="line-through text-gray-400">
//                 ₹{" "}
//                 {(
//                   data.price /
//                   (1 - data.discountPercentage / 100)
//                 ).toFixed(2)}
//               </p>
//             )}

//             <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
//               {data?.discountPercentage}% OFF
//             </span>
//           </div>

//           <p className="text-gray-600">{data?.description}</p>

//           {/* INFO GRID */}
//           <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
//             <p><strong>Brand:</strong> {data?.brand}</p>
//             <p><strong>Category:</strong> {data?.category}</p>
//             <p><strong>Stock:</strong> {data?.availabilityStatus}</p>
//             <p><strong>Shipping:</strong> {data?.shippingInformation}</p>
//           </div>

//           {/* ✅ CART BUTTON */}
//           <div className="flex gap-4 mt-4">
//             {inCart ? (
//               <button
//                 onClick={() => dispatch(deleteFromCart(data.id))}
//                 className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
//               >
//                 Remove From Cart
//               </button>
//             ) : (
//               <button
//                 onClick={() => dispatch(addToCart(data))}
//                 className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
//               >
//                 Add to Cart
//               </button>
//             )}
//           </div>

//           <div className="mt-4 text-sm text-gray-500 space-y-1">
//             <p>{data?.warrantyInformation}</p>
//             <p>{data?.returnPolicy}</p>
//           </div>
//         </div>
//       </div>

//       {/* REVIEWS */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold mb-6">
//           Customer Reviews
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6">
//           {data?.reviews?.map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
//             >
//               <p className="text-yellow-500">
//                 ⭐ {item.rating}
//               </p>
//               <p className="text-gray-700 my-2">
//                 {item.comment}
//               </p>
//               <p className="text-sm text-gray-500">
//                 — {item.reviewerName}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;