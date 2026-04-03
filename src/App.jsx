import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AppRoutes/>
  );
}

export default App;




// import { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./layouts/Navbar";
// import Sidebar from "./layouts/Sidebar";
// import LoaderSkeleton from "./components/LoaderSkeleton";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// // Lazy load pages
// const Product = lazy(() => import("./pages/Product"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Checkout = lazy(() => import("./pages/Checkout"));
// const Profile = lazy(() => import("./pages/Profile"));

// function App() {
//   return (
//     <Router>

//       <div className="flex flex-col h-screen">

//          <Route path="/login" element={<Login />} />
//          <Route path="/signup" element={<Signup/>} />

//         {/* Navbar at the top */}
//         <Navbar />

//         {/* Main area: Sidebar + Page content */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* Sidebar */}
//           <div className="w-64 bg-white border-r overflow-auto">
//             <Sidebar />
//           </div>

//           {/* Dynamic page content */}
//           <div className="flex-1 p-4 overflow-auto">
//             <Suspense fallback={<LoaderSkeleton />}>
//               <Routes>
//                 <Route path="/" element={<Home/>} />
//                 <Route path="/product/:id" element={<Product />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/checkout" element={<Checkout />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//               </Routes>
//             </Suspense>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import  ProductDetails  from "./components/ProductDetails";
// import ProductListContainer  from "./container/ProductListContainer";
// import  Navbar  from "./layouts/Navbar";
// import Sidebar from "./layouts/Sidebar";
// import  CartList  from "./container/CartList";
// import  Login  from "./pages/Login";
// import  Signup  from "./pages/Signup";
// import  Profile  from "./pages/Profile";
// import  Checkout  from "./pages/Checkout";


// const App = () => {
//   return(
//     <>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/list" element={<ProductListContainer />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="/cart" element={<CartList />} />
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/checkout" element={<Checkout/>}/>
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App;