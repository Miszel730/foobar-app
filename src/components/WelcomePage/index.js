import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Welcome = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/order");
    }, 3000);
  }, []);

  return (
    <div className="welcome-container">
      <h1 className="welcome">Welcome to FooBar </h1>
      <div class="loader">Loading...</div>
      <h2>PLEASE WAIT TO PROCEED YOUR ORDER</h2>
    </div>
  );
};

export default Welcome;
