import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import MetaData from "../Layouts/MetaData/MetaData";
import Loader from "../Layouts/loader/Loader";
import Sidebar from "./Siderbar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
// import { useHistory } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productsConstants";
import "../User/LoginFormStyle.css";
import { useNavigate, useParams } from "react-router-dom";
function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const alert = useAlert();

  // const classes = useStyles;
  const { id } = useParams();
  const productId = id;
  // const productId = 1;

  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState('');
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);
  const categories = [
    "Anime",
    "Manga",
    "Bags",
    "Shoes",
    "Clothing",
    "Accessories",
  ];
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {

      console.log(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory("");
      setInfo(product.info);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    // alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });


    dispatch(updateProduct(productId, myForm));
  };


  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MetaData title="Update Product" />
            <div className="flex">
              <div
              >
                <Sidebar />
              </div>
              <div className=" flex  w-full justify-center bg-slate-300">
                <div
                >
                  <form
                    className="flex flex-col items-center bg-white m-4 p-8 rounded-md"
                    encType="multipart/form-data"
                  >
                    <div
                      className=" text-xl font-semibold m-4"
                    >
                      Update Product
                    </div>
                    <div>Product Name:</div>
                    <input
                      placeholder="Product Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <div>Price:</div>
                    <input
                      placeholder="Price"
                      value={price}
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />

                    <div>Stock</div>
                    <input
                      placeholder="Stock"
                      value={Stock}
                      required
                      onChange={(e) => setStock(e.target.value)}
                    />

                    <div>Product Info</div>
                    <input
                      label="Product Info"
                      value={info}
                      required
                      onChange={(e) => setInfo(e.target.value)}
                    />

                    <div >
                      {!isCategory && (
                        <div
                        >
                          Choose Category
                        </div>
                      )}
                      <div >
                        <select
                          value={category}
                          onChange={handleCategoryChange}
                        >
                          {!category && (
                            <option value="">
                              <em>Choose Category</em>
                            </option>
                          )}
                          {categories.map((cate) => (
                            <option key={cate} value={cate}>
                              {cate}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>Product Description</div>
                    <input
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <div >
                      <div >
                      </div>

                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProductImagesChange}
                        ref={fileInputRef}
                      />
                      <label htmlFor="avatar-input">
                        <button
                          onClick={handleImageUpload}
                        >
                          <p className="uploadAvatarText">
                            Upload Images
                          </p>
                        </button>
                      </label>
                    </div>

                    {imagesPreview.length > 0 ? (
                      <div className=" w-96">
                        {imagesPreview &&
                          imagesPreview.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt="Product Preview"
                              className="w-96"
                            />
                          ))}
                      </div>
                    ) : (
                      <div >
                        {oldImages &&
                          oldImages.map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt="Old Product Preview"
                              className="w-96"
                            />
                          ))}
                      </div>
                    )}

                    <div
                      onClick={createProductSubmitHandler}
                      disabled={loading ? true : false}
                    >
                      Update
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
export default UpdateProduct;
