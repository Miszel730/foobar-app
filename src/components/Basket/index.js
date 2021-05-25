import React, { useState } from "react";
import { useHistory } from "react-router";

const Basket = (props) => {
  const [beersList, setBeersList] = useState(
    props.location?.state?.beersList || []
  );
  const incommingValues = props.location.state.beersList;

  const history = useHistory();

  console.log();

  return (
    <div>
      {beersList.map(
        (beer) =>
          (beer.quantity > 0 ||
            incommingValues.find((object) => object.name === beer.name)
              .quantity > 0) && (
            <>
              <div>
                {beer.name}
                <p>
                  {beer.category}, {beer.alc}%
                </p>
                <p>{beer.description.overallImpression}</p>
                <button
                  onClick={() =>
                    setBeersList((array) =>
                      array.map((object) =>
                        object.name === beer.name && object.quantity > 0
                          ? { ...object, quantity: object.quantity - 1 }
                          : object
                      )
                    )
                  }
                >
                  -
                </button>
                {beer.quantity}
                <button
                  onClick={() =>
                    setBeersList((array) =>
                      array.map((object) =>
                        object.name === beer.name
                          ? { ...object, quantity: object.quantity + 1 }
                          : object
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
            </>
          )
      )}
      <h3>
        Total price:{" $ "}
        {beersList
          .map((beer) => beer.quantity * beer.beerPrice)
          .reduce((a, b) => a + b, 0)}
      </h3>
      <p>{}</p>
      <button
        onClick={() =>
          history.push({ pathname: "/order", state: { beersList } })
        }
      >
        ←Continue shopping
      </button>
      <button
        onClick={() =>
          history.push({ pathname: "/payment", state: { beersList } })
        }
      >
        Launch order! →
      </button>
    </div>
  );
};

export default Basket;
