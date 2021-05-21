import React from "react";
import { useForm } from "react-hook-form";
import { fetchData } from "../../ApiService";

const Payment = (props) => {
  const {
    location: {
      state: { value: value },
    },
  } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchDate = watch("expMonth");

  const sendOrder = () => {
    console.log(Object.keys(value));
    const beersArr = [];
    Object.keys(value).map(
      (beer) =>
        value[beer] > 0 &&
        beersArr.push({
          name:
            beer !== "GitHop"
              ? beer
                  .replace(/([^0-9])([0-9])/g, "$1 $2")
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
              : beer,
          amount: value[beer],
        })
    );
    return beersArr;
  };
  sendOrder();
  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit((values) =>
            fetchData("order", "POST", sendOrder())
          )}
        >
          <label htmlFor="userName">Customer name:</label> <br />
          <input
            className="userName"
            type="text"
            {...register("userName", { required: true })}
          />
          <br />
          <label htmlFor="cardNumber">Card number:</label>
          <br />
          <input
            type="text"
            {...register("cardNumber", {
              required: true,
              pattern: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i,
            })}
          />
          <br />
          <label htmlFor="expMonth">Expiry date:</label>
          <br />
          <input
            type="month"
            {...register("expMonth", {
              required: true,
              validate: () =>
                new Date(watchDate).getTime() > new Date().getTime(),
            })}
          />
          <br />
          <label htmlFor="cvc">CVC:</label>
          <br />
          <input
            type="number"
            {...register("cvc", {
              required: true,
              pattern: /^[0-9]{3,4}$/,
            })}
          />
          <br />
          <button>onSubmit</button>
        </form>
      </div>
      <div>
        Order summary
        {Object.keys(value).map(
          (key) =>
            value[key] > 0 && (
              <div>
                {key} {value[key]}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Payment;
