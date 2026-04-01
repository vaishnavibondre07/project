import { ProductCard } from "../components/ProductCard";
import { useGetProductsQuery } from "../api/productApi";
import { useNavigate } from "react-router-dom";

export const ProductListContainer = () => {

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetProductsQuery();


  if (isLoading)  return <p className="text-center text-lg mt-10">Loading...</p>;
  

  if (error) return  <p className="text-center text-red-500 mt-10"> {error?.message} </p>
    
  

  return (
    <div className="p-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products.map((item) => (
          < ProductCard key={item.id} productData={item} 
                        onClick = {() => navigate(`/product/${item.id}`)} />
        ))}
      </ul>
    </div>
  );
};


// import { ProductCard } from "../components/ProductCard";
// import { useGetProductsQuery } from "../api/productApi";

// export const ProdcutListContainer = () => {

//     const {data, error, isLoading} = useGetProductsQuery();

//     (isLoading) && <p>Loading...</p>
//     (error) && <p>{error.message}</p>


//     return (
//         <>
//           <ul>
//             {data?.products.map((item) => {
//                 return (
//                     < ProductCard key={item.id}  productData={item} />
//                 )
//             })}
//           </ul>
//         </>
//     )
// }