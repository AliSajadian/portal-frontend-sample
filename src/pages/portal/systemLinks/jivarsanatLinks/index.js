import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import JivarSanatLinks from "../jivarsanatLinks/jivarsanatLinks/jivarsanatLinks";



const Index = (props) => {
  useEffect(() => {
  }, []);

  return (
    <Container className="p-0">
      <Row>
        <Col >
          <JivarSanatLinks></JivarSanatLinks>
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
