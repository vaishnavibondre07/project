import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  clearCart,
  selectCartItems,
  cartTotalPrice,
} from "../features/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(cartTotalPrice);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const formattedTotal = totalPrice?.toFixed(2) || "0.00";

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "pincode") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Validation
  const validateForm = () => {
    const { name, address, city, pincode, phone } = form;

    if (!name || !address || !city || !pincode || !phone)
      return "Please fill all details";

    if (name.trim().length < 4)
      return "Name must be at least 4 characters";

    if (!/^\d{6}$/.test(pincode))
      return "Pincode must be 6 digits";

    if (!/^[7-9][0-9]{9}$/.test(phone))
      return "Phone must start with 7, 8, or 9";

    return null;
  };

  // Place Order
  const handleOrder = () => {
    const errorMsg = validateForm();

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    if (cartItems.length === 0) {
      setError("Cart is empty");
      return;
    }

    alert("Order Placed Successfully!");

    dispatch(clearCart());

    setForm({
      name: "",
      address: "",
      city: "",
      pincode: "",
      phone: "",
    });

    setError("");
  };

  const isFormValid =
    form.name.trim().length >= 4 &&
    form.address &&
    form.city &&
    /^\d{6}$/.test(form.pincode) &&
    /^[7-9][0-9]{9}$/.test(form.phone);

  const inputStyle =
    "w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Checkout Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputStyle}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className={inputStyle}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street / Area"
                className={inputStyle}
              />
            </div>

            {/* City */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Mumbai"
                className={inputStyle}
              />
            </div>

            {/* Pincode */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Pincode
              </label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="400001"
                className={inputStyle}
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleOrder}
            disabled={!isFormValid || cartItems.length === 0}
            className={`mt-6 w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              !isFormValid || cartItems.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            }`}
          >
            Place Order ₹{formattedTotal}
          </button>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-3xl shadow-xl p-6 h-fit lg:sticky lg:top-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-4 rounded-xl transition"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TOTAL */}
          <div className="mt-5 border-t pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹ {formattedTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { clearCart } from "../features/cartSlice";
// import {
//   selectCartItems,
//   cartTotalPrice
// } from "../features/cartSlice";

// const Checkout = () => {
//   const dispatch = useDispatch();

//   const cartItems = useSelector(selectCartItems);
//   const totalPrice = useSelector(cartTotalPrice);

//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     city: "",
//     pincode: "",
//     phone: "",
//   });

//   // ✅ Safe total
//   const formattedTotal = totalPrice?.toFixed(2) || "0.00";

//   // ✅ Handle input
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Optional: restrict phone/pincode to numbers only
//     if (name === "phone" || name === "pincode") {
//       if (!/^\d*$/.test(value)) return;
//     }

//     setForm((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   // ✅ Validation
//   const validateForm = () => {
//     const { name, address, city, pincode, phone } = form;

//     if (!name || !address || !city || !pincode || !phone)
//       return "Please fill all details";

//     if (name.trim().length < 4)
//       return "Name must be at least 4 characters";

//     if (!/^\d{6}$/.test(pincode))
//       return "Pincode must be 6 digits";

//     if (!/^[7-9][0-9]{9}$/.test(phone))
//       return "Phone must start with 7, 8, or 9 and be 10 digits";

//     return null;
//   };

//   // ✅ Place order
//   const handleOrder = () => {
//     const errorMsg = validateForm();

//     if (errorMsg) {
//       setError(errorMsg);
//       return;
//     }

//     if (cartItems.length === 0) {
//       setError("Cart is empty");
//       return;
//     }

//     // ✅ Success
//     alert("Order Placed Successfully!");

//     console.log("Order Details:", {
//       customer: form,
//       items: cartItems,
//       total: totalPrice,
//     });

//     dispatch(clearCart());

//     setForm({
//       name: "",
//       address: "",
//       city: "",
//       pincode: "",
//       phone: "",
//     });

//     setError("");
//   };

//   // ✅ Live validation for button
//   const isFormValid =
//     form.name.trim().length >= 4 &&
//     form.address &&
//     form.city &&
//     /^\d{6}$/.test(form.pincode) &&
//     /^[7-9][0-9]{9}$/.test(form.phone);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
//       <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
        
//         {/* FORM */}
//         <div className="flex-1 bg-white p-8 rounded-2xl shadow border">
//           <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//           <div className="flex flex-col gap-4">
//             {["name", "address", "city", "pincode", "phone"].map(
//               (field) => (
//                 <input
//                   key={field}
//                   name={field}
//                   value={form[field]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field}`}
//                   className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               )
//             )}
//           </div>

//           {/* ERROR */}
//           {error && (
//             <p className="text-red-500 mt-3 text-sm">{error}</p>
//           )}

//           {/* BUTTON */}
//           <button
//             onClick={handleOrder}
//             disabled={!isFormValid || cartItems.length === 0}
//             className={`mt-6 p-3 rounded w-full font-semibold transition ${
//               !isFormValid || cartItems.length === 0
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-indigo-600 text-white hover:bg-indigo-700"
//             }`}
//           >
//             Place Order
//           </button>
//         </div>

//         {/* SUMMARY */}
//         <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow border">
//           <h2 className="text-xl font-semibold mb-4">
//             Order Summary
//           </h2>

//           {cartItems.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty</p>
//           ) : (
//             <div className="flex flex-col gap-2">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between text-sm"
//                 >
//                   <span>
//                     {item.title} (x{item.quantity})
//                   </span>
//                   <span>
//                     ₹ {(item.price * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* TOTAL */}
//           <div className="mt-4 border-t pt-3 font-bold flex justify-between text-lg">
//             <span>Total</span>
//             <span>₹ {formattedTotal}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;