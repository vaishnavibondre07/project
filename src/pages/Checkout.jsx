import { useCart } from "../context/CartContext";
import { useState, useMemo } from "react";

export const Checkout = () => {
  const { cartItems, cartTotalPrice, clearCart } = useCart();

  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const formattedTotal = useMemo(() => cartTotalPrice.toFixed(2), [cartTotalPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = () => {
    const { name, address, city, pincode, phone } = form;

    if (!name || !address || !city || !pincode || !phone) {
      alert("Please fill all details");
      return;
    }

    if (name.length < 4 ){
      setError('Enter valid name');
      return;
    }

    if (pincode.length !== 6 || isNaN(pincode)) {
      setError("Pincode must be 6 digits");
      return;
    }

     if (!/^[7-9][0-9]{9}$/.test(phone)) {
        setError("Phone must be 10 digits and start with 7, 8, or 9");
        return;
      }


    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    alert("Order Placed Successfully!");
    console.log("Order Details:", { form, cartItems, cartTotalPrice });

    setForm({ name: "", address: "", city: "", pincode: "", phone: "" });

    setError("");
    
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      
      <div className="w-full max-w-[80%] flex flex-col lg:flex-row gap-10">
        
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Shipping Details</h2>
          
          <div className="flex flex-col gap-4">
            {["name", "address", "city", "pincode", "phone"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={`Enter ${field}`}
                value={form[field]}
                onChange={handleChange}

                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm w-full max-w-md"
              />
            ))}
          </div>

          <div>
            {error && (<p className="text-red-500 text-center">{error}</p>)}
          </div>

          <button
            onClick={handleOrder}
            disabled={cartItems.length === 0}
            className={`m-6 p-4 rounded-lg font-semibold text-lg transition 
              ${cartItems.length === 0 
                ? "bg-gray-300 cursor-not-allowed text-gray-600" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"}`
            }
          >
            Place Order
          </button>
        </div>

        
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 lg:sticky lg:top-24">
          <h2 className="text-2xl font-semibold mb-5 text-gray-700">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-center py-10">Your cart is empty</p>
          ) : (
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3 border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ₹ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg text-gray-800">
            <span>Total</span>
            <span>₹ {formattedTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

// import { useCart } from "../context/CartContext";
// import { useState, useMemo } from "react";

// export const Checkout = () => {
//   const { cartItems, cartTotalPrice, clearCart } = useCart();

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     city: "",
//     pincode: "",
//     phone: "",
//   });

//   // ✅ Memoized total (performance)
//   const formattedTotal = useMemo(() => {
//     return cartTotalPrice.toFixed(2);
//   }, [cartTotalPrice]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOrder = () => {
//     const { name, address, city, pincode, phone } = form;

//     if (!name || !address || !city || !pincode || !phone) {
//       alert("Please fill all details");
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     alert("Order Placed Successfully!");

//     console.log("Order Details:", {
//       form,
//       cartItems,
//       cartTotalPrice,
//     });

//     // ✅ Reset form
//     setForm({
//       name: "",
//       address: "",
//       city: "",
//       pincode: "",
//       phone: "",
//     });

//     // ✅ Clear cart
//     clearCart();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">
      
//       {/* LEFT - FORM */}
//       <div className="flex-1 bg-white p-6 rounded-xl shadow">
//         <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//         <h3 className="text-lg font-semibold mb-3">Shipping Details</h3>

//         <div className="flex flex-col gap-3">
//           {["name", "address", "city", "pincode", "phone"].map((field) => (
//             <input
//               key={field}
//               type="text"
//               name={field}
//               placeholder={`Enter ${field}`}
//               value={form[field]}
//               onChange={handleChange}
//               className="border p-2 rounded"
//             />
//           ))}
//         </div>

//         <button
//           onClick={handleOrder}
//           disabled={cartItems.length === 0}
//           className={`mt-4 w-full py-2 rounded transition ${
//             cartItems.length === 0
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-black text-white hover:bg-gray-800"
//           }`}
//         >
//           Place Order
//         </button>
//       </div>

//       {/* RIGHT - ORDER SUMMARY */}
//       <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow">
//         <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

//         {cartItems.length === 0 ? (
//           <p className="text-gray-500 text-center">Cart is empty</p>
//         ) : (
//           <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between border-b pb-2"
//               >
//                 <div>
//                   <p className="font-medium line-clamp-1">
//                     {item.title}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Qty: {item.quantity}
//                   </p>
//                 </div>

//                 <p className="font-semibold">
//                   ₹ {(item.price * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mt-4 border-t pt-3 flex justify-between font-bold text-lg">
//           <span>Total</span>
//           <span>₹ {formattedTotal}</span>
//         </div>
//       </div>
//     </div>
//   );
// };




// import { useCart } from "../context/CartContext";
// import { useState } from "react";

// export const Checkout = () => {
//   const { cartItems, cartTotalPrice, clearCart } = useCart();

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     city: "",
//     pincode: "",
//     phone: "",
//   });

//    const formattedTotal = useMemo(() => {
//         return cartTotalPrice.toFixed(2);
//    }, [cartTotalPrice])

//   console.log(formattedTotal)


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleOrder = () => {
//     const { name, address, city, pincode, phone } = form;

//     if (!name || !address || !city || !pincode || !phone) {
//       alert("Please fill all details");
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     alert("Order Placed Successfully!");

//     console.log("Order Details:", {
//       form,
//       cartItems,
//       cartTotalPrice,
//     });

//     setForm({
//       name: '',
//       address: '',
//       city: '',
//       pincode: '',
//       phone: ''
//     });

//     clearCart();

//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">

//       <div className="flex-1 bg-white p-6 rounded-xl shadow">
//         <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//         <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow">
//         <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

//         <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between border-b pb-2"
//             >
//               <div>
//                 <p className="font-medium">{item.title}</p>
//                 <p className="text-sm text-gray-500">
//                   Qty: {item.quantity}
//                 </p>
//               </div>

//               <p className="font-semibold">
//                 ₹ {item.price * item.quantity}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-4 border-t pt-3 flex justify-between font-bold text-lg">
//           <span>Total</span>
//           <span>₹ {formattedTotal}</span>
//         </div>
//       </div>

//         <h3 className="text-lg font-semibold mb-3">Shipping Details</h3>

//         <div className="flex flex-col gap-3">
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter Name"
//             value={form.name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="text"
//             name="address"
//             placeholder="Enter Address"
//             value={form.address}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="text"
//             name="city"
//             placeholder="Enter City"
//             value={form.city}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="text"
//             name="pincode"
//             placeholder="Enter Pincode"
//             value={form.pincode}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Enter Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <button
//           onClick={handleOrder}
//           className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };