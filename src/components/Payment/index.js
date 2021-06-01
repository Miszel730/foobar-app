import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchData } from "../../ApiService";
import { useHistory } from "react-router";

const Payment = (props) => {
  const {
    location: {
      state: { beersList },
    },
  } = props;
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const watchDate = watch("expMonth");

  const sendOrder = () => {
    const beersArr = [];
    beersList.map(
      (beer) =>
        beer.quantity > 0 &&
        beersArr.push({
          name: beer.name,
          amount: beer.quantity,
        })
    );
    return beersArr;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h2 className="on-tap-today">Payment details</h2>
      <form
        onSubmit={handleSubmit((values) =>
          fetchData("order", "POST", sendOrder())
        )}
      >
        <div className="payment-container">
          <div className="form-box">
            <h1>Payment form</h1>
            <div className="name-field">
              <label htmlFor="userName">Customer name:</label> <br />
              <input
                className="userName"
                type="text"
                {...register("userName", {
                  required: "This field is required!",
                })}
              />
              <br />
              {errors.userName?.message}
            </div>
            <div className="card-field">
              <label htmlFor="cardNumber">Card number:</label>
              <br />
              <input
                type="text"
                {...register("cardNumber", {
                  required: "This field is required!",
                  pattern: {
                    value: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i,
                    message: "Not valid number / empty account",
                  },
                })}
              />
              <br />
              {errors.cardNumber?.message}
            </div>
            <div className="exp-field">
              <label htmlFor="expMonth">Expiry date:</label>
              <br />
              <input
                type="month"
                {...register("expMonth", {
                  required: "This field is required!",
                  validate: () =>
                    new Date(watchDate).getTime() > new Date().getTime(),
                })}
              />
              <br />
              {errors.expMonth?.message}
            </div>
            <div className="cvc-field">
              <label htmlFor="cvc">CVC:</label>
              <br />
              <input
                type="number"
                {...register("cvc", {
                  required: "This field is required!",
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: "This field requires only 3-4 numbers!",
                  },
                })}
              />
              <br />
              {errors.cvc?.message}
            </div>
          </div>
          <div className="order-check">
            <h1>Order summary</h1>
            {beersList.map(
              (key) =>
                key.quantity > 0 && (
                  <div className="salut-box">
                    <img
                      className="picture"
                      src={`/img/${key.name
                        .replaceAll(" ", "")
                        .toLowerCase()}.png`}
                    />
                    <div className="all-info">
                      <div className="beer-name">{key.name} </div>
                      <p className="beer-details">
                        {key.category}, {key.alc}%
                      </p>
                    </div>
                    <div className="beer-amount">{key.quantity}</div>
                  </div>
                )
            )}
            <div className="price-box">
              <h3>
                Total price:{" $ "}
                {beersList
                  .map((beer) => beer.quantity * beer.beerPrice)
                  .reduce((a, b) => a + b, 0)}
              </h3>
            </div>
          </div>
        </div>
        <div className="proceed-order">
          <button
            className="checkout"
            onClick={() =>
              history.push({ pathname: "/basket", state: { beersList } })
            }
          >
            Back to basket
          </button>
          <button className="checkout">Launch the order</button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
