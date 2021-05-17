import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import CaterTypesList from "./caterTypes/caterTypes";
import { GetCaterTypesList } from "../../../../redux/actions/meetingCaterTypesActions";
import CaterTypeModal from "./caterTypesModal/caterTypesModal";


const Index = (props) => {

  useEffect(() => {
    props.getCaterTypesList();
  }, []);

  return (
    <Container>
      {/* <h1 className="h3 mb-3">شرکت</h1>  */}

      <Row>
        <Col >
          <CaterTypesList></CaterTypesList>
        </Col>
      </Row>
      
      <CaterTypeModal></CaterTypeModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCaterTypesList: () => dispatch(GetCaterTypesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
