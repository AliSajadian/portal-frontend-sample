import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import JobPositionsList from "./jobPositionsList/jobPositions";
import { GetJobPositionsList } from "../../../../redux/actions/jobPositionsActions";
import JobPositionModal from "../jobPositions/jobPositionsModal/jobPositionsModal";


const Index = (props) => {

  useEffect(() => {
    props.getJobPositions();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">عنوان شغلی</h1> */}

      <Row>
        <Col>
          <JobPositionsList></JobPositionsList>
        </Col>
      </Row>
      
      <JobPositionModal></JobPositionModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobPositions: () => dispatch(GetJobPositionsList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
