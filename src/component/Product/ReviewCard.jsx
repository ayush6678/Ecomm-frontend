import React, { useState, useEffect, lazy, Suspense } from "react";
//  import CricketBallLoader from "../Layouts/loader/Loader";
import { useStyles } from "./ReviewStyle";
import { useNavigate } from "react-router-dom";
import CricketBallLoader from "../Layouts/loader/Loader";
import { toast } from 'react-toastify';
// const DialogBox = lazy(() => import("./DialogBox"));
import { NEW_REVIEW_RESET } from "../../constants/productsConstants";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, newReview } from "../../actions/productAction";


const ReviewCard = ({ product }) => {
  const classes = useStyles;
  const { isAuthenticated } = useSelector((state) => state.userData);
  // const alert = useAlert();
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState("highest");

  const handleSortChange = (event) => {

    setSortValue(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!isAuthenticated) {
      toast.error("Please Login to write a review");
      navigate("/login");
    }
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //Review dialog Box
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);
  const [recommend, setRecommend] = useState(false);

  const { success, error } = useSelector((state) => {
    return state.addNewReview;
  });

  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;
  console.log(productId)
  // const alert = useAlert();


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatings(event);
  };

  const handleSubmit = () => {
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("comment", comment);
    myForm.set("ratings", ratings);
    myForm.set("recommend", recommend);
    if (productId) {
      myForm.set("productId", productId);
    } else {
      myForm.set("productId", productId);
    }
    dispatch(newReview(myForm));
    toast.success("Review posted successfully");
    handleClose();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch,
    // alert,
    error, success]);

  console.log(product.reviews)
  return (
    <div style={classes.reviewRoot}>
      <div className=" text-2xl text-center font-bold">
        Users Reviews
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClickOpen}
      >
        Write your Review
      </button>

      {open &&

        <div className="flex items-center justify-center ">
          <div className=""></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Write your review</h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Review</label>
                <input
                  type="text"
                  placeholder="Enter title here"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Enter description here"
                  value={comment}
                  onChange={handleDescriptionChange}
                  rows="4"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(ratingValue => (
                    <button
                      key={ratingValue}
                      onClick={() => handleRatingChange(ratingValue)}
                      className={`text-2xl ${ratings >= ratingValue ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      <div container alignItems="center" style={{ marginTop: "2rem" }}>
        <div item style={classes.ratingContainer}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(ratingValue => (
                <button
                  key={ratingValue}
                  className={`text-2xl ${product.ratings >= ratingValue ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  &#9733;
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={classes.ratingNumber}>
          {product.ratings} stars
        </div>
        <div item>
          <div>
            <strong> Total Reviews : </strong>
            {product.numOfReviews}
          </div>
        </div>
      </div>

      <div className=" flex overflow-x-scroll">
        {product.reviews &&
          product.reviews.map((review) =>
            <div className=" m-6 p-6 shadow-lg w-96 rounded-md">
              <div className=" "><div className=" font-semibold">{review.name}</div> {review.createdAt.substring(0, 10)}</div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(ratingValue => (
                  <button
                    key={ratingValue}
                    className={`text-2xl ${review.ratings >= ratingValue ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    &#9733;
                  </button>
                ))}
              </div>
              <div className=" font-semibold">{review.title}</div>
              <div>{review.comment}</div>
            </div>

          )}
      </div>
    </div>
  );
};

export default ReviewCard;
