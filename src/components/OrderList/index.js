import React, { useContext, useEffect, useState } from "react";
import { fetchData } from "../../ApiService";
import { useHistory } from "react-router";

const OrderList = (props) => {
  const [beersList, setBeersList] = useState([]);
  const [availableBeers, setAvailableBeers] = useState([]);

  const [value, setValue] = useState(
    props.location?.state?.value
      ? props.location.state.value
      : {
          Steampunk: 0,
          Sleighride: 0,
          HollabackLager: 0,
          HoppilyEverAfter: 0,
          ElHefe: 0,
          FairyTaleAle: 0,
          GitHop: 0,
          Mowintime: 0,
          Row26: 0,
          RuinedChildhood: 0,
        }
  );

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
    const beerTypes = await fetchData("beertypes");
    const beersWithPrice = beerTypes.map((beerObject) => ({
      ...beerObject,
      beerPrice: Math.floor(Math.random() * 6),
      quantity: 0,
    }));
    beersWithPrice && setBeersList(beersWithPrice);
  }, []);
  useEffect(() => {
    console.log(beersList);
  }, [beersList]);

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
                      onClick={
                        () =>
                          setBeersList((beerObject) =>
                            beerObject.name === beer.name
                              ? {
                                  ...beerObject,
                                  quantity: beerObject.quantity - 1,
                                }
                              : beerObject
                          )
                        // setValue((prevValue) =>
                        //   prevValue[beerName] > 0
                        //     ? {
                        //         ...prevValue,
                        //         [beerName]: prevValue[beerName] - 1,
                        //       }
                        //     : { ...prevValue }
                        // )
                      }
                    >
                      -
                    </button>
                    <input className="" value={value[beerName]} type="number" />
                    <button
                      onClick={() =>
                        setValue((prevValue) => ({
                          ...prevValue,
                          [beerName]: prevValue[beerName] + 1,
                        }))
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
          history.push({ pathname: "/basket", state: { value, beersList } })
        }
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderList;
