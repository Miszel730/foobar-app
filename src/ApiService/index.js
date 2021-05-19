export const fetchData = async () => {
  const response = await fetch("https://fooboobar.herokuapp.com/", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
