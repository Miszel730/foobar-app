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
    <div>
      <h2>Take a look at what we have on tap today! </h2>
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
                <div>
                  <p className="beer-name">{beer.name}</p>
                  <p className="beer-details">
                    {beer.category}, {beer.alc}%
                  </p>
                  <p
                    className={`detailed-description ${
                      expanded === beer.name
                        ? "detailed-description--shown"
                        : ""
                    }`}
                  >
                    {beer.description.overallImpression}
                  </p>
                  <p className="beer-price">$ {beer.beerPrice}</p>
                  <div>
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
                    <input className="" value={beer.quantity} type="number" />
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
                </div>
              </li>
            )
          );
        })}
      </ul>
      <button
        onClick={() =>
          history.push({ pathname: "/basket", state: { beersList } })
        }
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderList;
