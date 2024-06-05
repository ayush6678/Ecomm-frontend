import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useRouteMatch } from "react-router-dom";
import useActive from "../hook/useActive";
import ReviewCard from "./ReviewCard";
import {
  clearErrors,
  // getProductDetails,
} from "../../actions/productAction";
import MetaData from "../Layouts/MetaData/MetaData";
import { addItemToCart } from "../../actions/cartAction";
import CricketBallLoader from "../Layouts/loader/Loader";
import { PRODUCT_DETAILS_RESET } from "../../constants/productsConstants";
import { getProductDetails } from "../../actions/productAction";
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [i, setI] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState("");
  const { handleActive, activeClass } = useActive(0);
  const [size, setSize] = useState("S")
  const { product,
    loading,
    error, success } = useSelector(
      (state) => state.productDetails
    );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
    if (success) {
      setPreviewImg(product.images[0].url);

      handleActive(0);
      dispatch({ type: PRODUCT_DETAILS_RESET });
    }
    dispatch(getProductDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    error,
    // alert,
    success,
    id,
  ]);


  // handling Add-to-cart
  const handleAddItem = () => {

    dispatch(addItemToCart(id, quantity, size));
    toast.success("Item Added To Cart");
  };

  // handling Preview image
  const handlePreviewImg = (images, i) => {

    setPreviewImg(images[i].url);
    handleActive(i);
  };

  function increaseQuantityHandler() {
    if (product.Stock <= quantity) {
      return;
    }

    setQuantity((prv) => prv + 1);
  }

  function deceraseQuantityHandler() {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prv) => prv - 1);
  }
  const convertToPoints = (text) => {
    if (text && typeof text === 'string') { return text.split('. ').filter(sentence => sentence.trim().length > 0); }
  };

  const points = convertToPoints(product.description);
  return (
    <>
      {loading ? (
        <CricketBallLoader />
      ) : (
        <>

          <div className="bg-white mt-16 dark:bg-gray-800 py-16">
            <div className=" mx-auto px-6 lg:px-8">

              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  {product.images &&
                    // <img src={img.url} className="mb-4 rounded-lg" alt="..." />

                    <div id="default-carousel" class="relative w-full " data-carousel="slide">
                      <div class="relative rounded-lg h-full">
                        <div class=" duration-700 ease-in-out" data-carousel-item>
                          <img src={product.images[i].url} className=" mb-4" alt="..." />
                        </div>
                      </div>

                      <button onClick={() => {
                        const newIndex = i === 0 ? product.images.length - 1 : i - 1;
                        setI(Number(newIndex))
                      }} type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                          </svg>
                          <span class="sr-only">Previous</span>
                        </span>
                      </button>
                      <button onClick={() => {
                        const newIndex = i === product.images.length - 1 ? 0 : i + 1;
                        setI(Number(newIndex))
                      }} type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                          </svg>
                          <span class="sr-only">Next</span>
                        </span>
                      </button>
                    </div>
                  }
                </div>






                <div className="md:flex-1 px-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {product.info}
                  </p>

                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                      <span className="text-gray-600 dark:text-gray-300">₹{product.price}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                      <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                    </div>
                  </div>


                  <div className=" flex align-middle items-center gap-4 mb-4" >
                    <div className=" flex" >
                      <div className="">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map(ratingValue => (
                            <div
                              key={ratingValue}
                              className={`text-2xl ${product.ratings >= ratingValue ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                              &#9733;
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div >
                      <div>
                        <strong> Total Reviews : </strong>
                        {product.numOfReviews}
                      </div>
                    </div>
                  </div>

                  {/* <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                    <div className="flex items-center mt-2">
                      <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                      <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                      <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                      <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                    </div>
                  </div> */}
                  <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                    <div className="flex items-center mt-2">
                      <button onClick={() => { setSize("S") }} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                      <button onClick={() => { setSize("M") }} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                      <button onClick={() => { setSize("L") }} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                      <button onClick={() => { setSize("XL") }} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                      <button onClick={() => { setSize("XXL") }} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                    </div>
                    <div className="mt-4 font-bold text-gray-700">Selected Size: {size}</div>
                  </div>
                  <div className="flex -mx-2 mb-4 mt-6">
                    <div className="w-1/2 px-2">
                      <button
                        onClick={handleAddItem}
                        disabled={product.Stock <= 0}
                        className="w-full bg-gray-900 disabled:bg-gray-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div className="w-1/2 px-2">
                      {/* <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button> */}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      <ul className="list-disc list-inside space-y-2">
                        {points && points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="">
            <ReviewCard product={product} />
          </div>
          {/* 
          <div className="prodcutDetailsContainer">
            <MetaData title={product.name} />
            <section id="product_details" className="section">
              <div className="product_container">
                <div className="wrapper prod_details_wrapper">

                  <div className="prod_details_left_col">
                    <div className="prod_details_tabs">
                      {product.images &&
                        product.images.map((img, i) => (
                          <div
                            key={i}
                            className={`tabs_item ${activeClass(i)}`}
                            onClick={() => handlePreviewImg(product.images, i)}
                          >
                            <img src={img.url} alt="product-img" />
                          </div>
                        ))}
                    </div>
                    <figure className="prod_details_img">
                      <img src={previewImg} alt="product-img" />
                    </figure>
                  </div>

                  <div className="prod_details_right_col_001">
                    <h1 className="prod_details_title">{product.name}</h1>
                    <h4 className="prod_details_info">
                      {product.info && product.info}
                    </h4>

                    <div className="prod_details_ratings">
                      <Rating
                        value={product.ratings}
                        precision={0.5}
                        readOnly
                        style={{ color: "black", fontSize: 16 }}
                      />
                      <span>|</span>
                      <Link
                        to="/success"
                        style={{ textDecoration: "none", color: "#414141" }}
                      >
                        {product.numOfReviews} Ratings
                      </Link>
                    </div>

                    <div className="prod_details_price">
                      <div className="price_box">
                        <h2 className="price">
                          {newPrice} &nbsp;
                          <small className="del_price">
                            <del>{oldPrice}</del>
                          </small>
                        </h2>
                        <p className="saved_price">
                          You save: {savedPrice} ({savedDiscount}%)
                        </p>
                        <span className="tax_txt">
                          (Inclusive of all taxes)
                        </span>
                      </div>

                      <div className="badge">
                        {product.Stock >= 1 ? (
                          <span className="instock">
                            <DoneIcon /> In Stock
                          </span>
                        ) : (
                          <span className="outofstock">
                            <CloseIcon />
                            Out of stock
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="seprator2"></div>

                    <div className="productDescription">
                      <div className="productDiscriptiopn_text">
                        <h4>Descripition :</h4>
                        <p>{product.description}</p>
                      </div>
                      <div className="prod_details_offers">
                        <h4>Offers and Discounts</h4>
                        <ul>
                          <li>No Cost EMI on Credit Card</li>
                          <li>Pay Later & Avail Cashback</li>
                        </ul>
                      </div>
                      <div className="deliveryText">
                        <LocalShippingOutlinedIcon />
                        We deliver! Just say when and how.
                      </div>
                    </div>
                    <div className="seprator2"></div>

                    <div className="prod_details_additem">
                      <h5>QTY :</h5>
                      <div className="additem">
                        <IconButton
                          onClick={deceraseQuantityHandler}
                          className="additem_decrease"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Input
                          readOnly
                          type="number"
                          value={quantity}
                          className="input"
                        />
                        <IconButton
                          onClick={increaseQuantityHandler}
                          className="additem_increase"
                        >
                          <AddIcon />
                        </IconButton>
                      </div>

                      <Button
                        variant="contained"
                        className="prod_details_addtocart_btn"
                        onClick={handleAddItem}
                        disabled={product.Stock <= 0}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div >
            </section >
            <div className="reviewCard">
              <ReviewCard product={product} />
            </div>
          </div > */}

        </>
      )}
    </>
  );
};

export default ProductDetails;
