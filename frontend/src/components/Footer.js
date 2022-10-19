import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    Project based on Udemy course: <a target="_blank" rel="noreferrer" href="https://www.udemy.com/course/mern-ecommerce/">https://www.udemy.com/course/mern-ecommerce/</a>
                </Col>
            </Row>
        </Container>
    </footer>
  );
}

export default Footer;
