import MetaData from "../Layouts/MetaData/MetaData"
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import FeaturedSlider from "./FeatureSlider";
import "./Home.css";
import { useEffect } from "react";
import { toast } from 'react-toastify';


function Home() {

    const dispatch = useDispatch();
    const {
        loading,
        error, products } = useSelector((state) => state.products);
    console.log(products)

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
                <div id="default-carousel" className=" lg:mt-20 lg:block hidden relative w-full " data-carousel="slide">
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <div className=" duration-700 ease-in-out" data-carousel-item>
                            <img src="https://i.pinimg.com/originals/d4/a8/fa/d4a8faa6147ef48adf272d83e2eb279e.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                        <div className=" duration-700 ease-in-out" data-carousel-item>
                            <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web-banner_1_q2b02ee.jpg?format=webp&w=1500&dpr=1.3" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                        <div className=" duration-700 ease-in-out" data-carousel-item>
                            <img src="" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="." />
                        </div>
                        <div className=" duration-700 ease-in-out" data-carousel-item>
                            <img src="" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="." />
                        </div>
                        <div className=" duration-700 ease-in-out" data-carousel-item>
                            <img src="" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="." />
                        </div>
                    </div>
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                    </div>
                    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>

                <div className="">
                    <img className=" w-screen" src="https://assets.ajio.com/cms/AJIO/WEB/2192023-PLPStrip-RelianceOne-Points-1440x128.jpg" />
                </div>

                <div>
                    <img className=" w-screen" src="https://mercury.akamaized.net/i/db5a03be0bd3268f7023a18cc8ac4a50_270183_0.jpg" />
                </div>

                <div className="feature hidden lg:block " style={{
                    marginTop: "2.7rem",
                    marginBottom: "2.7rem",
                }}>
                    <h2
                        style={{
                            textAlign: "center",
                            fontFamily: `"Inria Sans", sans-serif`,
                            fontWeight: "400",
                            marginBottom: "2.7rem"
                        }}
                    >
                        Trending Category
                    </h2>

                    {products &&
                        <FeaturedSlider products={products} />}

                </div>
                <div className=" ">

                    <img className=" w-screen" src="https://images.bewakoof.com/uploads/grid/app/DailyDeals-ThinStrip-Desktop-T-Shirts--2--1715346507.jpg" alt="." />
                </div>

                <h2 className="trending_heading">Special Collection</h2>

                <div className="trending-products">

                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            </div>

        </>
    )
}

export default Home;