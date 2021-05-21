export const fetchData = async (endpoint, method, beerData) => {
  console.log(JSON.stringify(beerData));
  const response = await fetch(
    `https://fooboobar.herokuapp.com/${endpoint ? endpoint : ""}`,
    {
      headers: { "Content-Type": "application/json" },
      method: method ? method : "GET",
      body: JSON.stringify(beerData),
    }
  );
  const data = await response.json();
  return data;
};
