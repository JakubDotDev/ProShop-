import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate(props) {
  return (
    props.pages > 1 && (
      <Pagination className="my-3">
        {[...Array(props.pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={!props.isAdmin ? 
              props.keyword
                ? `/search/${props.keyword}/page/${x + 1}`
                : `/page/${x + 1}` : `/admin/productList/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === props.page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
