import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../requestMethods";

const CustomProducts = ({ cat, filters, sort, displayNo, featured, related }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageRotation, setImageRotation] = useState(0);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault(); // prevent the link from being followed
    setIsFavorite(!isFavorite);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const degrees = Math.floor(Math.random() * 90);
    setImageRotation(degrees);
  };

  const imageStyle = {
    transform: `rotate(${isHovered ? imageRotation : 0}deg)`,
    transition: "transform 0.5s ease",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        let endpoint = `${BASE_URL}products`;
        if (cat) {
          endpoint += `?categorySlug=${cat}`;
        } else if (featured) {
          endpoint += `/featured`;
        } else if (related) {
          endpoint += `/related?productSlug=${related}`;
        }
        const res = await axios.get(endpoint);
        setProducts(res.data);
        setIsLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat, featured, related]);

  
  
  

  

  

  return (
    <div className="container w-full">
      {isLoading ? (
          // Display the CardPlaceholder while loading
            <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${noOfCols} gap-8`}>
              {[...Array(noOfCols)].map((_, i) => (
                <CardPlaceholder key={i} featured={featured}/>
              ))}
            </div>
            ) : (
            <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${displayNo} gap-8`}>
              {products.slice(0, displayNo).map((item) => (
                    <div
                      key={item._id}
                      className="w-full p-4"
                    >
                      <Link to={`/product/${item.slug}`} className="w-full">
                          <div className="w-full h-fit relative bg-white">
                              <div className="bg-gray-300 bg-opacity-20 relative">
                              <img
                                  src={item.img}
                                  className="h-[200px] w-full relative"
                                  alt={item.title}
                                  style={imageStyle}
                                  onMouseEnter={handleMouseEnter}
                                  onMouseLeave={handleMouseLeave}
                              />
                              <div style={overlayStyle}></div>
                              <div className="w-full h-full absolute top-0 left-0 z-3 flex items-center justify-center transition-all duration-500 cursor-pointer">
                                  <div
                                  className={`w-10 h-10 rounded-full bg-gray-400 text-${isFavorite ? `green-500` : "white"} flex items-center justify-center m-0 transition-all duration-500 z-99 transform hover:scale-110 absolute top-4 right-4`}
                                  onClick={handleFavoriteClick}
                                  >
                                  <FavoriteBorderOutlined />
                                  </div>
                              </div>
                              </div>
                              <div className="flex flex-col gap-5 bg-opacity-0 z-4 py-5 px-4 h-[150px] justify-around">
                                  <p className="text-black text-normal">{item.desc}</p>
                                  <p className="text-green-500 font-bold text-normal">${item.price}<span className="text-xs pr-2">.99</span></p>
                                  
                              </div>
                          </div>
                      </Link>
                    </div>
                  ))
              }
            </div>
            )}
    </div>
  );
};

export default CustomProducts;
