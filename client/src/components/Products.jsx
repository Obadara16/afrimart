import { useEffect, useState } from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { BASE_URL } from "../requestMethods";
import CardPlaceholder from "../placeholders/CardPlaceholder";

const Products = ({
  cat,
  filters,
  sort,
  displayNo,
  noOfCols,
  featured,
  related,
  subcat,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let endpoint = `${BASE_URL}products`;
        if (cat) {
          endpoint += `?categorySlug=${cat}`;
        } else if (featured) {
          endpoint += `/featured`;
        } else if (subcat) {
          endpoint += `/categorySlug=${cat}&subcategorySlug=${subcat}`;
        } else if (related) {
          endpoint += `/related?productSlug=${related}`;
        }
        const res = await axios.get(endpoint);
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat, featured, related]);

  return (
    <div className="w-full mx-auto">
        {isLoading ? (
          // Display the CardPlaceholder while loading
            <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${noOfCols} gap-8`}>
              {[...Array(noOfCols)].map((_, i) => (
                <CardPlaceholder key={i} featured={featured}/>
              ))}
            </div>
            ) : (
            <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${noOfCols} gap-8`}>
              {products.slice(0, displayNo).map((item) => (
              <div
                key={item._id}
                className="w-full"
              >
                <Product item={item} featured={featured} />
              </div>
              ))}
            </div>
        )}
    </div>
  );
};

export default Products;
