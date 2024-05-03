import React from "react";
// import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles ={
  rootPayment: {
    width: "100%",
    display: "flex",
    gap: "2.5rem",
    padding: "1rem 0rem 0rem 0rem",
    
      


  },
  image: {
    width: "155px",
    height: "140px",
    objectFit: "cover",
    // [theme.breakpoints.down(899)]: {
    //   width: "255px",
    //   height: "240px",
    // },
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    fontWeight: "500",
    fontSize: "18px",
    marginBottom: "2rem",
  },
  quantity: {
    fontSize: 16,
    marginBottom: "1rem",
    color: "#00000080",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
  },
  finalPrice: {
    fontWeight: 400,
    fontSize: 16,
  },
  discountPrice: {
    textDecoration: "line-through",
    // color: theme.palette.text.secondary,
    marginLeft: "2rem",
    fontSize: 16,
  },
  paymentStatus: {
    color: "green",
    fontSize: 16,
    marginTop: "1rem",
  },
  paymentValue: {

    fontWeight: 400,
    marginRight: "10px",
    color: "#00000080",
  },
};

const OrderDetailsSection = ({ item, totalDiscount, totalPrice }) => {
  const classes = useStyles;

  return (
    <div style={classes.rootPayment}>
      <img src={item.image} alt={item.name} style={classes.image} />
      <div style={classes.details}>
        <Typography variant="subtitle1" style={classes.productName}>
          {item.name}
        </Typography>
        <Typography variant="body2" style={classes.quantity}>
          <span
            style={{ fontWeight: 400, marginRight: "10px", color: "#00000080" }}
          >
            Quantity:
          </span>{" "}
          {item.quantity}
        </Typography>
        <div style={classes.priceContainer}>
          <Typography variant="body2" style={classes.finalPrice}>
            {totalPrice}
          </Typography>
          <Typography variant="body2" style={classes.discountPrice}>
            {totalDiscount}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" style={classes.paymentStatus}>
            <span style={classes.paymentValue}>Payment:</span> Paid
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSection;
