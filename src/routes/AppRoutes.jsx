import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";
import LoadingSkeleton from "../components/LoaderSkeleton";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../routes/ProtectedRoute";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const Product = lazy(() => import("../pages/Product"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Profile = lazy(() => import("../pages/Profile"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main App */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col h-[100dvh] overflow-hidden">

                {/* Navbar */}
                <Navbar />

                {/* Main Layout */}
                <div className="flex flex-1 overflow-hidden">

                  {/* Sidebar (no scroll) */}
                  <div className="bg-white border-r">
                    <Sidebar />
                  </div>

                  {/* Main Content (scroll only here) */}
                  <div className="flex-1 p-4 overflow-y-auto">

                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<Product />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route
                        path="/checkout"
                        element={
                          <ProtectedRoute>
                            <Checkout />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                    </Routes>

                  </div>
                </div>
              </div>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;


// import { lazy, Suspense } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
// import Sidebar from "../layouts/Sidebar";
// import LoadingSkeleton from "../components/LoaderSkeleton";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import ProtectedRoute from "../routes/ProtectedRoute";

// // Lazy-loaded pages
// const Home = lazy (() => import('../pages/Home'))
// const Product = lazy(() => import("../pages/Product"));
// const Cart = lazy(() => import("../pages/Cart"));
// const Checkout = lazy(() => import("../pages/Checkout"));
// const Profile = lazy(() => import("../pages/Profile"));

// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<LoadingSkeleton />}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           <Route
//             path="/*"
//             element={
//               <div className="flex flex-col h-screen overflow-hidden ">

//                 <Navbar />

//                 <div className="flex flex-1 overflow-hidden">

//                   <div className="bg-white border-r overflow-auto">
                    
//                     <Sidebar />
                  
//                   </div>

//                   <div className="flex-1 p-4 overflow-auto">

//                     <Routes>

//                       <Route path="/" element={<Home />} />

//                       <Route path="/product/:id" element={<Product />} />

//                       <Route path="/cart" element={<Cart />} />

//                       <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

//                       <Route path="/profile" element={<Profile />} />

//                       <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                      
//                     </Routes>
//                   </div>
//                 </div>
//               </div>
//             }
//           />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;
