import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image, Alert } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import { listTopRatedProducts } from "../reducer/productAction";

function ProductCarousel() {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.productTopRated
  );

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <BarLoader />
  ) : error ? (
    <Alert variant='danger'>{error}</Alert>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => {
        return (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {product.name} $({product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ProductCarousel;
