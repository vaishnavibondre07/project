import { useGetDetailsQuery } from "../api/productApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export const ProductDetails = () => {
  const { addToCart, deleteFromCart, isCart} = useCart();
  const { id } = useParams();
  const { data, isLoading, error } = useGetDetailsQuery(id);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (data?.images?.length) setSelectedImage(data.images[0]);
  }, [data]);

  if (isLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error?.message || "Something went wrong"}</p>;

  const inCart = isCart(data.id);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        
        <div className="flex flex-col gap-4">
          <div className="bg-gray-100 rounded-2xl p-6 flex justify-center items-center shadow-md">
            <img
              src={selectedImage}
              loading="lazy"
              alt={data?.title}
              className="h-96 object-contain hover:scale-105 transition"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {data?.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                loading="lazy"
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 object-contain border rounded-lg cursor-pointer transition
                  ${selectedImage === img ? "border-blue-500 ring-2 ring-blue-300" : "hover:border-blue-400"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{data?.title}</h1>
          <p className="text-yellow-500 font-medium text-lg">⭐ {data?.rating} / 5</p>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-600">₹ {data?.price}</p>
            <p className="line-through text-gray-400">
              ${(data?.price / (1 - data?.discountPercentage / 100)).toFixed(2)}
            </p>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
              {data?.discountPercentage}% OFF
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{data?.description}</p>

          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <p><strong>Brand:</strong> {data?.brand}</p>
            <p><strong>Category:</strong> {data?.category}</p>
            <p><strong>Stock:</strong> {data?.availabilityStatus}</p>
            <p><strong>Shipping:</strong> {data?.shippingInformation}</p>
          </div>

          {/* Add / Remove Button */}
          <div className="flex gap-4 mt-4">
            {inCart ? (
              <button
                onClick={() => deleteFromCart(data.id)}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition font-medium"
              >
                Remove From Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart({ ...data, quantity: 1 })}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
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

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data?.reviews?.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <p className="text-yellow-500 font-medium">⭐ {item.rating}</p>
              <p className="text-gray-700 my-2">{item.comment}</p>
              <p className="text-sm text-gray-500">— {item.reviewerName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};





// import { useGetDetailsQuery } from "../api/productApi"
// import { useParams } from "react-router-dom"
// export const ProductDetails = () => {


//     const {id} = useParams();

//     const {data, isLoading, error} = useGetDetailsQuery(id);

//     if(isLoading) return <p>Loading..</p>

//     if(error) return <p>{error.message}</p>

//     return (
//         <>

//         <div>
//             <figure>
//                 <img src={data.images[0]} alt="{data.title}" />
//             </figure>

//             <h1>{data.title}</h1>
//             <h3>{data.description}</h3>
//             <p>{data.brand}</p>
//             <p>{data.category}</p>
//             <p>{data.price}</p>
//             <p>{data.discountPercentage}</p>

//             <p>{data.warrantyInformation}</p>
//             <p>{data.shippingInformation}</p>
//             <p>{data.availabilityStatus}</p>
//             <p>{data.returnPolicy}</p>

//             <p>{data.rating}</p>

//             <div>
//                 {
//                     data.reviews.map((item) => {
//                         return <div>
//                             <p>{item.rating}</p>
//                             <p>{item.comment}</p>
//                             <p>{item.reviewerName}</p>

//                         </div>
//                     })
//                 }
//             </div>
            
//         </div>
         
//         </>
//     )
// }