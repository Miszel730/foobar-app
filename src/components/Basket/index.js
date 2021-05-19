import React, { useState } from "react";
import { useHistory } from "react-router";

const Basket = (props) => {
  const [value, setValue] = useState(props.location.state.value);

  const incommingValues = props.location.state.value;
  const history = useHistory();

  return (
    <div>
      {Object.keys(value).map(
        (key) =>
          (value[key] > 0 || incommingValues[key] > 0) && (
            <div>
              {key}
              <button
                onClick={() =>
                  setValue((prevValue) =>
                    prevValue[key] > 0
                      ? {
                          ...prevValue,
                          [key]: prevValue[key] - 1,
                        }
                      : { ...prevValue }
                  )
                }
              >
                -
              </button>
              {value[key]}
              <button
                onClick={() =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    [key]: prevValue[key] + 1,
                  }))
                }
              >
                +
              </button>
            </div>
          )
      )}
      <button
        onClick={() => history.push({ pathname: "/order", state: { value } })}
      >
        ←Continue shopping
      </button>
      <button
        onClick={() => history.push({ pathname: "/payment", state: { value } })}
      >
        Launch order! →
      </button>
    </div>
  );
};

export default Basket;
