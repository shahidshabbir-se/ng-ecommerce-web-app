// pages/search.js
'use client'
// pages/search.js
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {getProductByTerm} from "@utils/product/search.utils";
import Link from "next/link";

const Results = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  const categoryId = searchParams.get("category_id");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!searchQuery) {
          console.log("No search query provided");
          return;
        }

        setLoading(true); // Set loading state to true before fetching data
        const data = await getProductByTerm(searchQuery, categoryId ? parseInt(categoryId, 10) : undefined);
        setProducts(data);
        console.log("Products:", data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching data (success or error)
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      console.log("No search query provided");
    }
  }, [searchQuery, categoryId]); // Dependencies for useEffect

  return (
    <div>
      <h1>Search Results</h1>
      {searchQuery ? (
        <p>Showing results for: {searchQuery}</p>
      ) : (
        <p>No search term provided.</p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              <Link href=''>
                {product.productName}
              </Link>
              <p>{product.productDescription}</p>
              {/* Add more product details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
