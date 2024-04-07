import MetaData from "../Layouts/MetaData/MetaData"
import HeroSlider from "./HeroSlider";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import FeaturedSlider from "./FeatureSlider";
import "./Home.css";
import { useEffect } from "react";
import { toast } from 'react-toastify';



import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
// import { Pagination } from 'swiper/modules';
import { Pagination } from "swiper";


function Home() {
    // const alert = useAlert();

    const dispatch = useDispatch();
    const {
        // loading,
        error, products } = useSelector((state) => state.products);

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
            <div className="Home_Page" style={{ marginTop: "7rem" }}>
                <div className="heroSlider_Home">
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src="https://images.bewakoof.com/uploads/category/desktop/inside-banner-desktop_anime-1693226429.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>

                </div>

                <div className="vibe">
                    <div>
                        Find Your Vibe With Kriptees
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="boxes">
                            Basics from 399Rs
                        </div>
                        <div className="boxes">
                            Classic from 499Rs
                        </div>
                        <div className="boxes">
                            Combos from 599Rs
                        </div>
                    </div>
                </div>

                <div className="feature" style={{
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