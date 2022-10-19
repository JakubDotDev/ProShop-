import React from "react";
import { Helmet } from "react-helmet";

function Meta(props) {
  return (
    <Helmet>
      <title>{props.title || "Welcome to ProShop"}</title>
      <meta
        name='descritpion'
        content={props.description || "We sell the best products for cheap"}
      ></meta>
      <meta
        name='keyword'
        content={props.keywords || "electronics, cheap electronics, cheap"}
      ></meta>
    </Helmet>
  );
}

export default Meta;
