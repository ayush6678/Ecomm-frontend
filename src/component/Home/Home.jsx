import MetaData from "../Layouts/MetaData/MetaData"
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import FeaturedSlider from "./FeatureSlider";
import "./Home.css";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import img1 from '../../ecommerce images/1L.png';
import img2 from '../../ecommerce images/2L.png';
import img3 from '../../ecommerce images/3L.png';
import img4 from '../../ecommerce images/4L.png';
import img1P from '../../ecommerce images/1.png';
import img2P from '../../ecommerce images/2.png';
import img3P from '../../ecommerce images/3.png';
import img4P from '../../ecommerce images/4.png';



function Home() {
    const arr = [img1, img2, img3, img4]
    const arrP = [img1P, img2P, img3P, img4P]

    const [i, setI] = useState(0)
    const [img, setImg] = useState(arr[i])
    const [imgP, setImgP] = useState(arrP[i])

    useEffect(() => {
        setImg(arr[i])
        setImgP(arrP[i])
    }, [i])

    const dispatch = useDispatch();
    const {
        loading,
        error, products } = useSelector((state) => state.products);
    console.log(img1)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProduct());
    }, [dispatch, error,
        // alert
    ]);

    return (
        <>
            <MetaData title="Kriptees" />
            <div className="Home_Page" >


                <div id="default-carousel" class="relative w-full mt-20 lg:mt-24" data-carousel="slide">
                    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <div class=" hidden lg:block duration-700 ease-in-out" data-carousel-item>
                            <img src={img} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                        <div class=" lg:hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={imgP} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                    </div>
                    {/* <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                    </div> */}
                    <button onClick={() => {
                        const newIndex = i === 0 ? 3 : i - 1;
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
                        const newIndex = i === 3 ? 0 : i + 1;
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


                <div className="">
                </div>

                <div>
                </div>

                <div className="hidden lg:block" >
                    <h2 className=" text-center font-semibold text-2xl m-4">
                        Trending Category
                    </h2>
                    {products &&
                        <FeaturedSlider products={products} />}

                </div>
                <div className=" ">

                </div>

                <h2 className=" text-center font-semibold text-2xl m-8">Special Collection</h2>

                <div className="flex flex-wrap justify-center">

                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            </div >

        </>
    )
}

export default Home;