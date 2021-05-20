import React, { useContext, useEffect, useState } from "react";
import { fetchData } from "../../ApiService";
import { useHistory } from "react-router";

const OrderList = (props) => {
  const [beersList, setBeersList] = useState([]);
  const [value, setValue] = useState(
    props.location.state.value
      ? props.location.state.value
      : {
          steampunk: 0,
          sleighride: 0,
          hollabacklager: 0,
          hoppilyeverafter: 0,
          elhefe: 0,
          fairytaleale: 0,
          githop: 0,
          mowintime: 0,
          row26: 0,
          ruinedchildhood: 0,
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
    setBeersList(newList);
  }, []);

  return (
    <div>
      <h2>Take a look at what we have on tap today! </h2>
      <ul>
        {beersList.map((beer, index) => {
          const beerName = beer.replaceAll(" ", "").toLowerCase();
          return (
            <li key={index}>
              <img width="309px" height="235px" src={`/img/${beerName}.png`} />
              <div>
                <p>{beer}</p>
                <p>79DKK</p>
                <div>
                  <button
                    onClick={() =>
                      setValue((prevValue) =>
                        prevValue[beerName] > 0
                          ? {
                              ...prevValue,
                              [beerName]: prevValue[beerName] - 1,
                            }
                          : { ...prevValue }
                      )
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
          );
        })}
      </ul>
      <button
        onClick={() => history.push({ pathname: "/basket", state: { value } })}
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderList;
