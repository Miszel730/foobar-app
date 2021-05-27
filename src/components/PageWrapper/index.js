import React from "react";

const PageWrapper = (props) => {
  return (
    <div className="pageWrapper">
      <h1>Logo</h1>
      {props.children}
      <footer className="footer">
        <p>All rights reserved - FooBar Space Industry 2074</p>
      </footer>
    </div>
  );
};

export default PageWrapper;
