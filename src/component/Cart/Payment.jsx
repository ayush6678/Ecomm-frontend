import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layouts/MetaData/MetaData";
// import { useAlert } from "react-alert";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import OrderDetailsSection from "./OrderDetails";
import DummyCard from "./DummyCard";
import { clearErrors, createOrder } from "../../actions/orderAction";
import CheckoutSteps from "./CheckoutSteps ";

// for cardDetails for card detials input section and hooks for accessing strip and element from App.js route
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Cart.css";
import {
  Typography,
  TextField,
  Grid,
  Radio,
  Button,
  Divider,
  Link,
} from "@mui/material";
import {
  CreditCard,
  CardMembership,
  Payment,
  Lock,

} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
// import { makeStyles } from "@mui/styles";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import { ReactComponent as MasterCard } from "../../Image/payment-svg/mastercard.svg";
import { ReactComponent as Visa } from "../../Image/payment-svg/visa (1).svg";
import { ReactComponent as Paytm } from "../../Image/payment-svg/paytm.svg";
import {
  displayMoney,
  generateDiscountedPrice,
} from "../DisplayMoney/DisplayMoney";
import { useNavigate } from "react-router-dom";

const useStyles = {
  payemntPage: {
    padding: "1rem 0",
    width: "100%",
    backgroundColor: "white",
    overFlow: "hidden",
  },

  paymentPage__container: {
    display: "flex",
    width: "100%",
    boxSize: "border-box",
    justifyContent: "space-around",
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column-reverse",
    //   alignItems: "center",
    // },
  },

  PaymentBox: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    paddingLeftLeft: "0.5rem",
    overFlow: "hidden",
    backgroundColor: "white",
    width: "50%",
    // [theme.breakpoints.down("sm")]: {
    //   width: "90%",
    //   marginTop: "1rem",
    //   padding: "2rem",
    // },
  },
  PaymentHeading: {
    fontWeight: "800",
    marginBottom: "1rem",
    fontSize: "1.5rem",
    textTransform: "uppercase",
  },
  securePayemnt: {
    display: "flex",
    alignItems: "center",
    fontWeight: "300",
    backgroundColor: "#f5f5f5 !important",
    width: "90%",
    padding: "1rem",
    gap: "0.8rem",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "2rem",
    },
  },
  icons: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    width: "100%",
    "& svg": {
      fontSize: "1.8rem",
      cursor: "pointer",
    },
  },
  cardContainer: {
    padding: "1rem",
    border: "1px solid #f5f5f5",
    borderRadius: "0.5rem",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
    width: "90%",
  },
  subHeading: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: "500",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "1.5rem",
    },
  },
  cardDetails: {
    width: "100%%",
    "& .MuiGrid-item": {
      marginBottom: "0.5rem",
    },
  },
  labelText: {
    fontWeight: "300",
  },
  outlinedInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
        borderRadius: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "#000",
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
  },
  cardSelection: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "1.5rem",
      cursor: "pointer",
      color: "#00000080",
    },
  },

  radioText: {
    fontWeight: "400",
    fontSize: "1rem",
    color: "#00000080",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  },
  radio: {
    color: "#000",
    "&.Mui-checked": {
      color: "#000",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
  placeOrderBtn: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "500",
    fontSize: "1rem",
    padding: "0.8rem 1rem",
    borderRadius: "0.5rem",
    width: "90%",
    marginLeft: "1rem",
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "#00000080",
    },
  },
  termsAndConditionsText: {
    fontFamily: "Roboto",
    color: "#727272",
    fontWeight: "400",
    lineHeight: "17px",
    paddingLeft: "16px",
    fontSize: "12px",
  },
  privacyText: {
    marginLeft: "4px",
    textDecoration: "underline",
    color: "black",
    fontSize: "14px",
    "&:hover": {
      color: "red",
    },
  },
  paymentInput: {
    width: "95%",
    padding: "18.5px 14px",
    border: "1px solid #000",
  },
  paymentInput2: {
    width: "90%",
    padding: "18.5px 14px",
    border: "1px solid #000",
  },
  cardNumberInput: {
    position: "relative",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
        borderRadius: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "#000",
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
  },
  expiryInput: {
    position: "relative",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
        borderRadius: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "#000",
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
  },
  cvvInput: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    top: "50%",
    right: "1rem",
    transform: "translateY(-50%)",
    color: "#00000080",
    cursor: "pointer",
  },

  payemntAmount: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "fit-content",
    padding: "1rem 0.5rem 0 0.5rem",
    width: "40%",
    // [theme.breakpoints.down("sm")]: {
    //   width: "90%",
    //   padding: "2rem",
    // },
  },
  order_Details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "2rem 0.5rem 2rem 0.5rem",
    // [theme.breakpoints.down("sm")]: {
    //   width: "90%",
    //   padding: "2rem",
    // },
  },
  orderSub_heading: {
    fontWeight: "600",
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  boldDivider: {
    borderBottom: `0.3px solid #3A3E3A`,
    margin: "5px 0",
    width: "99%",
  },
  shipping_Deatils: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    padding: "1rem 1px",
    // [theme.breakpoints.down("sm")]: {
    //   width: "90%",
    //   padding: "1rem 2rem",
    // },
  },
  shipping_Address: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",

    // [theme.breakpoints.down("sm")]: {
    //   width: "90%",
    // },
  },
  shipping_Address_Details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontWeight: "300",
    padding: "10px 0px",
    width: "70%",
  },
  shipping_Address_edit: {
    paddingRigth: "1rem",
    "& svg": {
      fontSize: "1.8rem",
      cursor: "pointer",
      color: "black",
      "&:hover": {
        color: "#ed1c24",
      },
    },
  },
};

const PaymentComponent = () => {
  const classes = useStyles;
  const navigate = useNavigate();
  // const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.userData);
  const user1 = JSON.parse(sessionStorage.getItem("user"));
  const { error } = useSelector((state) => state.newOrder);
  const [isFocused, setIsFocused] = useState(false);
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showDummyCard, setShowDummyCard] = useState(false);

  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const totalFinalPrice = subTotal;

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
  };

  const handleApplyCoupon = () => {
    // handle apply coupon logic
    setIsValid(false);
  };

  const handleFocus = (event) => {
    setIsFocused(event.target.value !== "");
  };

  const handleRadioChange = () => {
    setShowDummyCard(!showDummyCard);
  };

  const handleCloseDummyCard = () => {
    setShowDummyCard(false);
  };


  const address = `${shippingInfo.address} , ${shippingInfo.city} ${shippingInfo.state
    } , ${shippingInfo.pinCode} , ${shippingInfo.country || "India"}`;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subTotal,
    shippingPrice: 0,
    totalPrice: totalFinalPrice,
  };

  const paymentData = {
    amount: Math.round(totalFinalPrice * 100),
  };

  async function paymentSubmitHandler(e) {
    e.preventDefault();
    if (nameOnCard === "") {
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      // sessionStorage.removeItem("stripeApiKey");

      const { data } = await axios.post(
        "https://ecomm-backend-o6x0.onrender.com/api/v1/payment/process",
        paymentData,
        config
      );
      // client_secret is key from STRIPE  while making payement post req at backend
      const client_secret = data.client_secret;

      // passed at App.js route statement
      if (!stripe || !elements) return;

      const result = await stripe;
      const { paymentMethod, error } = await result.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement)
      })

      if (!error) {
        try {
          const response = await result.paymentIntents.confirm(client_secret, {
            payment_method: paymentMethod.id,
          });

          if (response.error) {
            console.error('Error confirming payment:', response.error);
            // Handle payment error here
          } else {
            // Payment successful
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
            // alert.success(result.paymentIntent.status);
            dispatch(createOrder(order));
            navigate("/success");
            console.log('Payment successful:', response);
            // Handle successful payment here
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle other errors here
        }
      } else {
        console.error('Error creating payment method:', error);
        // Handle payment method creation error here
      }


      // const result = await stripe.confirmCardPayment(client_secret, {
      //   payment_method: {
      //     card: elements.getElement(CardNumberElement),
      //     billing_details: {
      //       name: user.name,
      //       email: user.email,
      //       address: {
      //         line1: shippingInfo.address,
      //         state: shippingInfo.state,
      //         postal_code: shippingInfo.pinCode,
      //         country: "IN",
      //       },
      //     },
      //   },
      // });


      if (result.error) {
        // if error then again enable the button on
        console.log(result)
        // alert.error(result.error.message);
      }
      else {
        if (result.paymentIntent.status === "succeeded") {
          // add new property inside order object
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          // alert.success(result.paymentIntent.status);
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          // alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      // if error while payment then again enable payment button

      // console.log("err")

      // alert.error(error.message);
    }
  }


  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch,
    // alert,
    error]);

  // claculte price after discount
  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  let discountedPrice = generateDiscountedPrice(totalPrice);
  let totalDiscount = totalPrice - discountedPrice;
  let final = totalPrice - totalDiscount;
  final = displayMoney(final);
  totalDiscount = displayMoney(totalDiscount);
  totalPrice = displayMoney(totalPrice);

  return (
    <>
      <div style={classes.payemntPage}>
        <CheckoutSteps activeStep={2} />
        <MetaData title={"Payment"} />
        <div style={classes.paymentPage__container}>
          <div style={classes.PaymentBox}>
            <Typography
              variant="h5"
              component="h1"
              style={classes.PaymentHeading}
            >
              Payment method
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={classes.securePayemnt}
            >
              <AssuredWorkloadOutlinedIcon />
              Payments are SSL encrypted so that your credit card and payment
              details stay safe.
            </Typography>

            <div style={classes.cardContainer}>
              <Typography variant="h6" style={classes.subHeading}>
                Credit Card <CreditCard fontSize="medium" />
              </Typography>
              <Grid container spacing={2} style={classes.cardDetails}>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    style={classes.labelText}
                  >
                    Card number
                  </Typography>
                  <div style={classes.cardNumberInput}>
                    <CardMembership style={classes.inputIcon} />
                    <CardNumberElement style={classes.paymentInput} />
                  </div>
                </Grid>
                <Grid item xs={12} container justifyContent="space-between">
                  <Grid item style={classes.icons}>
                    <MasterCard
                      style={{
                        width: "5%",
                        height: "auto",
                      }}
                    />
                    <Visa
                      style={{
                        width: "5%",
                        height: "auto",
                      }}
                    />
                    <Paytm
                      style={{
                        width: "5%",
                        height: "auto",
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    style={classes.labelText}
                  >
                    EXPIRY DATE
                  </Typography>
                  <div style={classes.expiryInput}>
                    <Payment style={classes.inputIcon} />
                    <CardExpiryElement style={classes.paymentInput2} />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    style={classes.labelText}
                  >
                    CVV/CVV
                  </Typography>
                  <div style={classes.cvvInput}>
                    <Lock style={classes.inputIcon} />
                    <CardCvcElement style={classes.paymentInput2} />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    style={classes.labelText}
                  >
                    NAME ON CARD
                  </Typography>
                  <TextField
                    placeholder="John Doe"
                    variant="outlined"
                    fullWidth
                    style={classes.outlinedInput}
                    value={nameOnCard}
                    required
                    onChange={handleNameOnCardChange}
                  />
                </Grid>
              </Grid>
            </div>

            <div style={classes.cardSelection}>
              <Radio
                value="dummyCard"
                style={classes.radio}
                checked={showDummyCard}
                onChange={handleRadioChange}
              />
              <Typography variant="subtitle2" style={classes.radioText}>
                Use dummy card
              </Typography>
              <CreditCard fontSize="medium" />
              {showDummyCard && <DummyCard onClose={handleCloseDummyCard} />}
            </div>
            <Typography
              variant="body2"
              style={classes.termsAndConditionsText}
            >
              By clicking "Place Order", you agree to our
              <Link href="#" style={classes.privacyText}>
                Kristees Terms & Conditions
              </Link>
            </Typography>
            <Button
              variant="contained"
              style={classes.placeOrderBtn}
              fullWidth
              // disabled={isDisable}
              // style={{ marginTop: "3rem" }}
              onClick={paymentSubmitHandler}
            >
              Place Order
            </Button>
          </div>
          <div style={classes.payemntAmount}>
            <div className="order_summary">
              <h4>
                Order Summary &nbsp; ( {cartItems.length}{" "}
                {cartItems.length > 1 ? "items" : "item"} )
              </h4>
              <div className="order_summary_details">
                <div className="price order_Summary_Item">
                  <span>Original Price</span>
                  {/* ORIGINAL PRICE TOATAL */}
                  <p>{totalPrice}</p>
                </div>

                <div className="discount order_Summary_Item">
                  <span>Discount</span>
                  <p>
                    <del>{totalDiscount}</del>
                  </p>
                </div>

                <div className="delivery order_Summary_Item">
                  <span>Delivery</span>
                  <p>
                    <b>Free</b>
                  </p>
                </div>

                <div className="separator_cart"></div>
                <div className="total_price order_Summary_Item">
                  <div>
                    <h4>Total Price</h4>

                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "-10px",
                        color: "#414141",
                      }}
                    >
                      (Inclusive of all taxes)
                    </p>
                  </div>
                  <p>
                    <b>{final}</b>
                  </p>
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="coupon-box-wrapper">
              <div
                className={`coupon-box-content ${isFocused ? "focused" : ""}`}
              >
                <TextField
                  label="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={() => setIsFocused(false)}
                  error={!isValid}
                  helperText={!isValid && "Invalid coupon code"}
                  variant="outlined"
                  size="small"
                  style={{
                    width: "200px",
                    marginRight: "1rem",
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className="coupon-box-apply-btn"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              </div>
            </div>

            <div className="paymentLogoImg">
              <img
                src={require("../../Image/cart/cart_img.png")}
                alt="payemnt-icons"
                className="paymentImg"
              />
            </div>
            <div style={classes.order_Details}>
              <h5 style={classes.orderSub_heading}>ORDER DETAILS</h5>
              {cartItems &&
                cartItems.map((item, idx) => (
                  <Link to={`/product/${item.productId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <OrderDetailsSection
                      key={idx}
                      item={item}
                      totalDiscount={totalDiscount}
                      totalPrice={totalPrice}
                    />
                  </Link>
                ))}
            </div>
            <Divider style={classes.boldDivider} />
            <div style={classes.shipping_Deatils}>
              <Typography variant="h6" style={classes.orderSub_heading}>
                DELIVERY ADDRESS
              </Typography>

              <div style={classes.shipping_Address}>
                <div style={classes.shipping_Address_Details}>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {user.name && user.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {address}
                  </Typography>
                </div>
                <div style={classes.shipping_Address_edit}>
                  <EditIcon
                    style={classes.editIcon}
                    onClick={() => {
                      navigate("/shipping");
                    }}
                  />
                </div>
              </div>
              <Typography
                variant="subtitle2"
                // style={classes.mobileNo}
                style={{
                  fontWeight: 400,
                  marginTop: "-5px",
                  fontSize: "16px",
                }}
              >
                {shippingInfo.phoneNo},
              </Typography>

              <Typography
                variant="subtitle2"
                style={classes.emailAddress}
              // style={{ fontWeight: 400, fontSize: "16px" }}
              >
                {user.email}
              </Typography>
            </div>

            <div style={classes.shipping_Deatils}>
              <Typography
                variant="h6"
                style={classes.orderSub_heading}
              // style={{ marginTop: "5px" }}
              >
                BILLING DETAILS
              </Typography>

              <div style={classes.shipping_Address}>
                <div style={classes.shipping_Address_Details}>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {address}
                  </Typography>
                </div>
                <div style={classes.shipping_Address_edit}>
                  <EditIcon
                    style={classes.editIcon}
                    onClick={() => {
                      navigate("/shipping");
                    }}
                  />
                </div>
              </div>
              <Typography
                variant="subtitle2"
                // style={classes.mobileNo}
                style={{
                  fontWeight: 400,
                  marginTop: "-5px",
                  fontSize: "16px",
                }}
              >
                {shippingInfo.phoneNo},
              </Typography>

              <Typography
                variant="subtitle2"
                style={classes.emailAddress}
              // style={{ fontWeight: 400, fontSize: "16px" }}
              >
                {user.email}
              </Typography>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default PaymentComponent;
