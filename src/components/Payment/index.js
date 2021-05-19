import React from "react";

const Payment = (props) => {
  const {
    location: {
      state: { value: value },
    },
  } = props;

  return (
    <div>
      <div>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
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
