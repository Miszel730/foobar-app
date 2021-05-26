import React from "react";

const PageWrapper = (props) => {
  return (
    <div className="pageWrapper">
      <h1>Logo</h1>
      {props.children}
      <footer className="footer">
        All rights reserved - FooBar Space Industry 2074
      </footer>
    </div>
  );
};

export default PageWrapper;
