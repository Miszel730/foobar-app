import React, { useState } from "react";
import { useHistory } from "react-router";

const Basket = (props) => {
  const [value, setValue] = useState(props.location.state.value);
  const [passBeers, setPassBeers] = useState(
    props.history.location.state.beersList
  );

  const incommingValues = props.location.state.value;
  const history = useHistory();
  console.log(Object.values(value));
  console.log(value);
  return (
    <div>
      {passBeers.map(
        (key) =>
          (value[key.name.replaceAll(" ", "")] > 0 ||
            incommingValues[key.name.replaceAll(" ", "")] > 0) && (
            <>
              <div>
                {key.name}
                <p>
                  {key.category}, {key.alc}%
                </p>
                <p>{key.description.overallImpression}</p>
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
                {value[key.name.replaceAll(" ", "")]}
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
            </>
          )
      )}
      <h3>Total price:</h3>
      <p>{}</p>
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
