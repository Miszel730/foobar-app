import React from "react";

const PageWrapper = (props) => {
  return (
    <div className="pageWrapper">
      <img className="logo" src="/img/moon-bar-logo.svg" />
      <div className="desktop-blur">
        <p>The App is not ready for desktop...</p>
        <p>Adjust your screen width</p>
      </div>
      {props.children}
      <footer className="footer">
        <p>All rights reserved - FooBar Space Industry 2074</p>
      </footer>
    </div>
  );
};

export default PageWrapper;
