import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Alert } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import { listProduct } from "../reducer/productAction";
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

function HomePage() {
  const dispatch = useDispatch();
  const { keyword, pageNumber } = useParams();
  const { loading, error, products, pages, page } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
    <Helmet>
      <title>Welcome to ProShop | Home</title>
      <meta name="description" content="We sell the best products for cheap"></meta>
      <meta name="keywords" content="electronics, cheap electronics, cheap"></meta>
    </Helmet>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <BarLoader color='0000' />
      ) : error ? (
        <Alert variant='danger'>Error</Alert>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col
                key={product._id}
                className='my-3'
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
}

export default HomePage;
