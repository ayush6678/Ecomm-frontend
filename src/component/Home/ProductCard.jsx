import React from "react";
import { Link } from "react-router-dom";
import { displayMoney, generateDiscountedPrice } from "../DisplayMoney/DisplayMoney"
import { addItemToCart } from "../../actions/cartAction";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    let discountPrice = generateDiscountedPrice(product.price);
    discountPrice = displayMoney(discountPrice);
    const oldPrice = displayMoney(product.price);

    const truncated =
        product.description
            .split(" ")
            .slice(0, 5)
            .join(" ") + "...";
    const nameTruncated = product.name.split(" ").slice(0, 3).join(" ") + "...";


    const addTocartHandler = (id, qty) => {
        dispatch(addItemToCart(id, qty));
        toast.success("Item added to cart!");
    }


    return (
        <div className="">

            <div className=" lg:m-8 border-black border">
                <Link
                    to={`/product/${product._id}`}
                >
                    <div class=" hover:shadow-lg aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img src={product.images[0].url} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                    </div>
                </Link>
                <div class="mt-4 flex justify-between p-1">
                    <div>
                        <h3 className=" text-gray-700 overflow-clip h-8  ">
                            <span class="absolute inset-0"></span>
                            {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Black</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">₹{product.price}</p>

                </div>
                {/* <button
                    onClick={() => addTocartHandler(product._id, 1)}
                    className=" w-full bg-[#3A68B8] mt-2 text-white p-1 rounded-md">Add to Cart
                </button> */}
            </div>

        </div>
    );
};

export default ProductCard;
