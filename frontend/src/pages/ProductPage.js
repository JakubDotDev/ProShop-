import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Alert,
  Form, 
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listProductDetails,
  createProductReview,
} from "../reducer/productAction";
import { BarLoader, ClimbingBoxLoader } from "react-spinners";
import { addToCart } from "../reducer/cartAction";

function ProductPage() {
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const { success: successReview, error: errorReview } = useSelector(
    (state) => state.productCreateReview
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if(successReview){
      alert("Review Submited")
      setRating(0)
      setComment("")
      dispatch({type: "PRODUCT_CREATE_REVIEW_RESET"})
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successReview]);

  function addToCartHandler() {
    dispatch(addToCart(product._id, qty));
    navigate("/cart");
  }

  function reviewSubmitHandler(event){
    event.preventDefault();
    dispatch(createProductReview(id, {
      rating,
      comment
    }))
  }

  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        Go back
      </Link>

      {loading ? (
        <BarLoader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
        <Meta title={`ProShop | ${product.name}`} />
          <Row>
            <Col md={6}>
              <Image fluid src={product.image} alt={product.name} />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='w-100'
                      variant='info'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Alert variant='info'>No reviews</Alert>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {errorReview && <Alert variant="danger">{errorReview}</Alert>}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <FormGroup controlId='rating'>
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as='select'
                          value={rating}
                          onChange={(event) => setRating(event.target.value)}
                        >
                          <option value=''>Select value</option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment">
                        <FormLabel>Comment</FormLabel>
                        <FormControl as="textarea" row="3" value={comment} onChange={(event) => setComment(event.target.value) }></FormControl>
                      </FormGroup>
                      <Button type="submit" className="my-3" variant="success">Submit</Button>
                    </Form>
                  ) : (
                    <Alert variant='info'>
                      <Link to='/login'>Sign in to write review</Link>
                    </Alert>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductPage;
