import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import FalatParsLinks from "../falatparsLinks/falatparsLinks/falatparsLinks";



const Index = (props) => {
  useEffect(() => {
  }, []);

  return (
    <Container className="p-0">
      <Row>
        <Col >
          <FalatParsLinks></FalatParsLinks>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(Index);
