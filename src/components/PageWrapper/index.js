import React from "react";

const PageWrapper = (props) => {
  return (
    <div className="pageWrapper">
      <img className="logo" src="/img/moon-bar-logo.svg" />
      <div className="desktop-blur">
        <p>Not ready for desktop... Adjust your screen width</p>
      </div>
      {props.children}
      <footer className="footer">
        <p>All rights reserved - FooBar Space Industry 2074</p>
      </footer>
    </div>
  );
};

export default PageWrapper;
