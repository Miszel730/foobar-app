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
    <>
      <h2 className="on-tap-today">My order </h2>
      <div className="basket-page">
        {beersList.map(
          (beer) =>
            (beer.quantity > 0 ||
              incommingValues.find((object) => object.name === beer.name)
                .quantity > 0) && (
              <>
                <div className="basket-container">
                  <img
                    className="pic"
                    src={`/img/${beer.name
                      .replaceAll(" ", "")
                      .toLowerCase()}.png`}
                  />
                  <div className="all-info">
                    <p className="beer-name"> {beer.name}</p>
                    <p className="beer-details">
                      {beer.category}, {beer.alc}%
                    </p>
                    <p className="detailed-description detailed-description--shown">
                      {beer.description.overallImpression}
                    </p>
                  </div>

                  <div className="add-beers-container">
                    <button
                      className="change-value-btn"
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
                    <p className="beer-amount">{beer.quantity}</p>
                    <button
                      className="change-value-btn"
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
                  <p className="price-check">$ {beer.beerPrice}</p>
                </div>
              </>
            )
        )}
        <div className="price-total">
          <h3>
            Total price:{" $ "}
            {beersList
              .map((beer) => beer.quantity * beer.beerPrice)
              .reduce((a, b) => a + b, 0)}
          </h3>
        </div>
      </div>
      <div className="proceed-order">
        <button
          className="checkout"
          onClick={() =>
            history.push({ pathname: "/order", state: { beersList } })
          }
        >
          ←Continue shopping
        </button>
        <button
          className="checkout"
          onClick={() =>
            history.push({ pathname: "/payment", state: { beersList } })
          }
        >
          Launch order! →
        </button>
      </div>
    </>
  );
};

export default Basket;
