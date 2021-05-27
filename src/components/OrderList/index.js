import React, { useEffect, useState } from "react";
import { fetchData } from "../../ApiService";
import { useHistory } from "react-router";

const OrderList = (props) => {
  const [beersList, setBeersList] = useState(
    props.location?.state?.beersList || []
  );
  const [availableBeers, setAvailableBeers] = useState([]);
  const [expanded, setExpanded] = useState("");
  const history = useHistory();

  useEffect(async () => {
    const { taps } = await fetchData();
    console.log(taps);
    const newList = [];
    taps.map(
      (object) =>
        newList.includes(object.beer) === false && newList.push(object.beer)
    );

    setAvailableBeers(newList);
  }, []);

  useEffect(async () => {
    if (!props.location?.state?.beersList) {
      const beerTypes = await fetchData("beertypes");
      const beersWithPrice = beerTypes.map((beerObject) => ({
        ...beerObject,
        beerPrice: Math.floor(Math.random() * 5 + 1),
        quantity: 0,
      }));
      beersWithPrice && setBeersList(beersWithPrice);
    }
  }, []);

  return (
    <div className="order-container">
      <h2 className="on-tap-today">
        Take a look at what we have on tap today!{" "}
      </h2>
      <ul className="beers-list">
        {beersList.map((beer, index) => {
          const beerName = beer.name.replaceAll(" ", "");
          return (
            availableBeers.includes(beer.name) && (
              <li
                className={`beers-list__item ${
                  expanded === beer.name ? "beers-list__item--expanded" : ""
                }`}
                onClick={() => setExpanded(beer.name)}
                key={index}
              >
                <div className="image-box">
                  <img className="images" src={`/img/${beerName}.png`} />
                </div>
                <div className="beer-box">
                  <div className="general-info">
                    <div className="title-box">
                      <p className="beer-name">{beer.name}</p>
                      <p className="beer-details">
                        {beer.category}, {beer.alc}%
                      </p>
                    </div>
                    <p className="beer-price">$ {beer.beerPrice}</p>
                  </div>
                  <p
                    className={`detailed-description ${
                      expanded === beer.name
                        ? "detailed-description--shown"
                        : ""
                    }`}
                  >
                    {beer.description.overallImpression}
                  </p>

                  <div className="add-beers-container add-beers-container--auto-top">
                    <button
                      className="change-value-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        setBeersList((array) =>
                          array.map((object) =>
                            object.name === beer.name && object.quantity > 0
                              ? { ...object, quantity: object.quantity - 1 }
                              : object
                          )
                        );
                      }}
                    >
                      -
                    </button>
                    <input
                      className="beer-amount"
                      value={beer.quantity}
                      type="number"
                    />
                    <button
                      className="change-value-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        setBeersList((array) =>
                          array.map((object) =>
                            object.name === beer.name
                              ? { ...object, quantity: object.quantity + 1 }
                              : object
                          )
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            )
          );
        })}
      </ul>
      <button
        className="checkout"
        onClick={() =>
          history.push({ pathname: "/basket", state: { beersList } })
        }
      >
        Check Out
      </button>
    </div>
  );
};

export default OrderList;
