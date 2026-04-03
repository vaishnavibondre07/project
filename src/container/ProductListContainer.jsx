import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoaderSkeleton";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../api/productApi";

const ProductListContainer = () => {
  const navigate = useNavigate();

  
  const [searchInput, setSearchInput] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [category, setCategory] = useState("all");
  const [sortPrice, setSortPrice] = useState("none");

  
  const { data, error, isLoading } = useGetProductsQuery();

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 500); 

    return () => clearTimeout(handler);
  }, [searchInput]);

  const products = useMemo(() => {
    if (!data?.products) return [];
    return data.products;
  }, [data]);

  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCats = Array.from(new Set(products.map((p) => p.category)));
    return ["all", ...uniqueCats];
  }, [products]);


  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = products;

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(lowerSearch));
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (sortPrice === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortPrice === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sortPrice]);

  if (isLoading) return <LoadingSkeleton/>
  if (error)
    return <p className="text-center text-red-500 mt-10">{error.message}</p>;

  return (
    <div className="p-6">
    
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="none">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => {
          return (
            <ProductCard
              key={item.id}
              productData={item}
              onClick={() => navigate(`/product/${item.id}`)}
            />
          );
        })}

      </ul>
    </div>
  );
};

export default ProductListContainer;



// import { useState, useMemo, useRef, useCallback } from "react";
// import ProductCard from "../components/ProductCard";
// import { useNavigate } from "react-router-dom";
// import LoadingSkeleton from "../components/LoaderSkeleton";
// import { useGetProductsQuery } from "../api/productApi";

// const PAGE_SIZE = 10; // Number of products per page

// const ProductListContainer = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [sortPrice, setSortPrice] = useState("none");
//   const [page, setPage] = useState(1);

//   const observer = useRef();

//   // Fetch products (you may need to adjust your RTK Query for paginated API)
//   const { data, error, isLoading } = useGetProductsQuery({ page, limit: PAGE_SIZE });

//   // Combine all pages
//   const products = useMemo(() => {
//     if (!data?.products) return [];
//     return data.products;
//   }, [data]);

//   // Extract categories
//   const categories = useMemo(() => {
//     if (!products) return [];
//     const uniqueCats = Array.from(new Set(products.map((p) => p.category)));
//     return ["all", ...uniqueCats];
//   }, [products]);

//   // Filter + sort
//   const filteredProducts = useMemo(() => {
//     if (!products) return [];

//     let result = products;

//     if (search) {
//       const lowerSearch = search.toLowerCase();
//       result = result.filter((p) => p.title.toLowerCase().includes(lowerSearch));
//     }

//     if (category !== "all") {
//       result = result.filter((p) => p.category === category);
//     }

//     if (sortPrice === "asc") {
//       result = [...result].sort((a, b) => a.price - b.price);
//     } else if (sortPrice === "desc") {
//       result = [...result].sort((a, b) => b.price - a.price);
//     }

//     return result;
//   }, [products, search, category, sortPrice]);

//   // Observer for infinite scroll
//   const lastProductRef = useCallback(
//     (node) => {
//       if (isLoading) return;
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && data?.hasMore) {
//           setPage((prev) => prev + 1);
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [isLoading, data]
//   );

//   // Loading/Error states
//   if (error)
//     return <p className="text-center text-red-500 mt-10">{error.message}</p>;

//   return (
//     <div className="p-6">
//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border border-gray-300 p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border border-gray-300 p-2 rounded-md w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </option>
//           ))}
//         </select>

//         <select
//           value={sortPrice}
//           onChange={(e) => setSortPrice(e.target.value)}
//           className="border border-gray-300 p-2 rounded-md w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="none">Sort by Price</option>
//           <option value="asc">Low to High</option>
//           <option value="desc">High to Low</option>
//         </select>
//       </div>

//       {/* Products Grid */}
//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map((item, index) => {
//           if (filteredProducts.length === index + 1) {
//             return (
//               <ProductCard
//                 key={item.id}
//                 ref={lastProductRef} // track last element
//                 productData={item}
//                 onClick={() => navigate(`/product/${item.id}`)}
//               />
//             );
//           }
//           return (
//             <ProductCard
//               key={item.id}
//               productData={item}
//               onClick={() => navigate(`/product/${item.id}`)}
//             />
//           );
//         })}

//         {isLoading && Array.from({ length: PAGE_SIZE }).map((_, i) => (
//           <LoadingSkeleton key={i} />
//         ))}
//       </ul>

//       {!data?.hasMore && !isLoading && (
//         <p className="text-center mt-4 text-gray-500">No more products</p>
//       )}
//     </div>
//   );
// };

// export default ProductListContainer;




// import { useState, useMemo } from "react";
// import ProductCard  from "../components/ProductCard";
// import { useGetProductsQuery } from "../api/productApi";
// import { useNavigate } from "react-router-dom";
// import LoadingSkeleton from "../components/LoaderSkeleton";


// const ProductListContainer = () => {
//   const navigate = useNavigate();
//   const { data, error, isLoading } = useGetProductsQuery();


//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [sortPrice, setSortPrice] = useState("none");

//   // Extract unique categories
//   const categories = useMemo(() => {
//     if (!data?.products) return [];
//     const uniqueCats = Array.from(new Set(data.products.map((p) => p.category)));
//     return ["all", ...uniqueCats];
//   }, [data]);

//   // Filter and sort products
//   const filteredProducts = useMemo(() => {
//     if (!data?.products) return [];

//     let products = data.products;

//     if (search) {
//       const lowerSearch = search.toLowerCase();
//       products = products.filter((p) => p.title.toLowerCase().includes(lowerSearch));
//     }

//     if (category !== "all") {
//       products = products.filter((p) => p.category === category);
//     }

//     if (sortPrice === "asc") {
//       products = [...products].sort((a, b) => a.price - b.price);
//     } else if (sortPrice === "desc") {
//       products = [...products].sort((a, b) => b.price - a.price);
//     }

//     return products;
//   }, [data, search, category, sortPrice]);

//   if (isLoading)
//     return <LoadingSkeleton/>;

//   if (error)
//     return <p className="text-center text-red-500 mt-10">{error.message}</p>;

//   if (!filteredProducts.length)
//     return <p className="text-center text-gray-500 mt-10">No products found.</p>;

//   return (
//     <div className="p-6">
      
//       <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border border-gray-300 p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border border-gray-300 p-2 rounded-md w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </option>
//           ))}
//         </select>

//         <select
//           value={sortPrice}
//           onChange={(e) => setSortPrice(e.target.value)}
//           className="border border-gray-300 p-2 rounded-md w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="none">Sort by Price</option>
//           <option value="asc">Low to High</option>
//           <option value="desc">High to Low</option>
//         </select>
//       </div>

//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map((item) => (
//           <ProductCard
//             key={item.id}
//             productData={item}
//             isLoading={isLoading}
//             onClick={() => navigate(`/product/${item.id}`)}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductListContainer;


// import { ProductCard } from "../components/ProductCard";
// import { useGetProductsQuery } from "../api/productApi";
// import { useNavigate } from "react-router-dom";

// export const ProductListContainer = () => {

//   const navigate = useNavigate();

//   const { data, error, isLoading } = useGetProductsQuery();


//   if (isLoading)  return <p className="text-center text-lg mt-10">Loading...</p>;
  

//   if (error) return  <p className="text-center text-red-500 mt-10"> {error?.message} </p>
    
  

//   return (
//     <div className="p-6">
//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {data?.products.map((item) => (
//           < ProductCard key={item.id} productData={item} 
//                         onClick = {() => navigate(`/product/${item.id}`)} />
//         ))}
//       </ul>
//     </div>
//   );
// };
