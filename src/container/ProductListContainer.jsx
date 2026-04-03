import { useState, useMemo } from "react";
import ProductCard  from "../components/ProductCard";
import { useGetProductsQuery } from "../api/productApi";
import { useNavigate } from "react-router-dom";


const ProductListContainer = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductsQuery();


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortPrice, setSortPrice] = useState("none");

  // Extract unique categories
  const categories = useMemo(() => {
    if (!data?.products) return [];
    const uniqueCats = Array.from(new Set(data.products.map((p) => p.category)));
    return ["all", ...uniqueCats];
  }, [data]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    let products = data.products;

    if (search) {
      const lowerSearch = search.toLowerCase();
      products = products.filter((p) => p.title.toLowerCase().includes(lowerSearch));
    }

    if (category !== "all") {
      products = products.filter((p) => p.category === category);
    }

    if (sortPrice === "asc") {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortPrice === "desc") {
      products = [...products].sort((a, b) => b.price - a.price);
    }

    return products;
  }, [data, search, category, sortPrice]);

  if (isLoading)
    return <p className="text-center text-lg mt-10">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error.message}</p>;

  if (!filteredProducts.length)
    return <p className="text-center text-gray-500 mt-10">No products found.</p>;

  return (
    <div className="p-6">
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
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
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            productData={item}
            isLoading={isLoading}
            onClick={() => navigate(`/product/${item.id}`)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductListContainer;


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
