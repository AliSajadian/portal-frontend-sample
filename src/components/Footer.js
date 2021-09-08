import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./component.css"


const Footer = () => (
  <footer className="footer" style={{position : "absolute" , width : "100%" , height : '2em' , bottom : "0", backgroundColor: "#f0f5ff", padding: "0"}} >
    <Container fluid>
      {/* <Row className="text-muted">
          <Col lg="9" xs="9" ><div className="div"><span >
          © Asfalt Tous LTD. {new Date().getFullYear()} Tehran IR. All rights reserved.
          </span></div>
          </Col>
      </Row> */}
      <div className="div"><span >
          © Asfalt Tous LTD. {new Date().getFullYear()} Tehran IR. All rights reserved.
          </span></div>
    </Container>
  </footer>
);
// style={{color: 'white'}}className="text-center"
export default Footer;
