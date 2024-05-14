import React, { useEffect, useState } from "react";

import './App.css';

export default function CheckoutForm() {


  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     // if (!stripe) {
  //     //   return;
  //     // }

  //     const clientSecret = new URLSearchParams(window.location.search).get(
  //       "payment_intent_client_secret"
  //     );

  //     if (!clientSecret) {
  //       return;
  //     }



  //     const paymentElementOptions = {
  //       layout: "tabs"
  //     }
  // )

  const handleSubmit = async (e) => {
    e.preventDefault();



    setIsLoading(true);



    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then

    setIsLoading(false);
  };


  return (
    <form className="form1" id="payment-form" onSubmit={handleSubmit}>

      <button className="button1" disabled={isLoading} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}