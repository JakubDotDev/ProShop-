import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product(props) {
  return (
    <Card className='my-3 p-3 h-100 rounded'>
      <Link to={`/product/${props.product._id}`}>
        <Card.Img src={props.product.image} variant='top' />
      </Link>

      <Link to={`/product/${props.product._id}`}>
        <Card.Title as='div'>
          <strong>{props.product.name}</strong>
        </Card.Title>
      </Link>

      <Card.Text as='div'>
        <div className='my-3'>
          <Rating
            value={props.product.rating}
            text={`${props.product.numReviews} reviews`}
          />
        </div>
      </Card.Text>

      <Card.Text as='h3'>${props.product.price}</Card.Text>
    </Card>
  );
}

export default Product;
