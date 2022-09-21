import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Alert } from "react-bootstrap";
import {ClimbingBoxLoader} from "react-spinners";
import Product from "../components/Product";
import { listProduct } from "../reducer/productAction";

function HomePage() {
  const dispatch = useDispatch();
  
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList

  useEffect(() => {

    dispatch(listProduct());

  }, [dispatch]);


  return (
    <>
      <h1>Latest Products</h1>
      {loading ? <ClimbingBoxLoader size={20} color="#36d7b7" /> : error ? <Alert variant="danger">Error</Alert> : 
      <Row>
        {products.map((product) => (
          <Col key={product._id} className='my-3' sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      }
    </>
  );
}

export default HomePage;
