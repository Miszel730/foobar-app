import React, { useEffect, useState } from "react";
import { fetchData } from "../../ApiService";
import { useHistory } from "react-router";

const OrderList = (props) => {
  const [beersList, setBeersList] = useState(
    props.location?.state?.beersList || []
  );
  const [availableBeers, setAvailableBeers] = useState([]);

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
        beerPrice: Math.floor(Math.random() * 6),
        quantity: 0,
      }));
      beersWithPrice && setBeersList(beersWithPrice);
    }
  }, []);

  return (
    <div>
      <h2>Take a look at what we have on tap today! </h2>
      <ul>
        {beersList.map((beer, index) => {
          const beerName = beer.name.replaceAll(" ", "");
          return (
            availableBeers.includes(beer.name) && (
              <li key={index}>
                <img
                  width="309px"
                  height="235px"
                  src={`/img/${beerName}.png`}
                />
                <div>
                  <p>{beer.name}</p>
                  <p>
                    {beer.category}, {beer.alc}%
                  </p>
                  <p>{beer.description.overallImpression}</p>
                  <p>$ {beer.beerPrice}</p>
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
