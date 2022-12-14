import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Alert, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import { updateUserProfile, userDetails } from "../reducer/userAction";
import { orderProfileList } from "../reducer/orderAction";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state) => state.orderProfileList);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(userDetails("profile"));
        dispatch(orderProfileList());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user, success]);

  function submitHandler(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password doesnt match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  }

  return (
    <>
      <Helmet>
        <title>ProShop | Profile </title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h2>User Profile: </h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='danger'>{message}</Alert>}
          {success && <Alert variant='success'>Profile Updated!</Alert>}
          {loading && <BarLoader color='#00000' />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-3'>
              <Form.Label>Enter password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='success'>
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My orders: </h2>
          {loadingOrders ? (
            <BarLoader />
          ) : errorOrders ? (
            <Alert variant='danger'>{errorOrders}</Alert>
          ) : (
            <Table striped borderd hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDeliverd ? (
                        order.deliverdAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ProfilePage;
