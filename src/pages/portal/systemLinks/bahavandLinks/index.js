import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import BahavandBaradLinks from "../bahavandLinks/bahavandLinks/bahavandLinks";



const Index = (props) => {
  useEffect(() => {
  }, []);

  return (
    <Container className="p-0">
      <Row>
        <Col >
          <BahavandBaradLinks></BahavandBaradLinks>
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
