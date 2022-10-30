import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
  Button,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { BarLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../reducer/orderAction";

function OrderPage() {
  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch({ type: "ORDER_DELIVER_RESET" });
      dispatch(getOrderDetails(id));
    } else if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [
    dispatch,
    id,
    order,
    successPay,
    sdkReady,
    navigate,
    userInfo,
    successDeliver,
  ]);

  function sucessPaymentHandler(paymentResult) {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  }

  function deliverHandler() {
    dispatch(deliverOrder(order));
  }

  return (
    <>
      <Helmet>
        <title>ProShop | Order: {id}</title>
      </Helmet>
      {loading ? (
        <BarLoader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping: </h2>
                  <p>
                    <b>Name: </b>
                    {order.user.name}
                  </p>
                  <p>
                    <b>Email: </b>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <b>Address:</b> <br />
                    {order.shippingAddress.address},<br />
                    {order.shippingAddress.city},<br />
                    {order.shippingAddress.postalCode},<br />
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Alert variant='success'>
                      Delivered on {order.deliveredAt}
                    </Alert>
                  ) : (
                    <Alert variant='danger'>Not Delivered</Alert>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method:</h2>
                  <p>
                    <b>Method: </b>
                    {order.paymentMethod ? (
                      order.paymentMethod
                    ) : (
                      <b>Please choose a payment method</b>
                    )}
                  </p>
                  {order.isPaid ? (
                    <Alert variant='success'>Paid on {order.paidAt}</Alert>
                  ) : (
                    <Alert variant='danger'>Not Paid</Alert>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items: </h2>
                  {order.orderItems.lenght === 0 ? (
                    <Alert variant='danger'>Order is empty</Alert>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <BarLoader />}
                      {!sdkReady ? (
                        <BarLoader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={sucessPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                  {loadingDeliver && <BarLoader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='w-100'
                          onClick={deliverHandler}
                        >
                          Mark as delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default OrderPage;
