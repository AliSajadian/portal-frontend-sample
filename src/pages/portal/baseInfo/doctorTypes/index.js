import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import DoctorTypesList from "../doctorTypes/doctorTypesList/doctorTypes";
import { GetDoctorTypesList } from "../../../../redux/actions/doctorTypesActions";
import DoctorTypeModal from "../doctorTypes/doctorTypesModal/doctorTypesModal";


const Index = (props) => {

  useEffect(() => {
    props.getDoctorTypes();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">نوع پزشک</h1> */}

      <Row>
        <Col>
          <DoctorTypesList></DoctorTypesList>
        </Col>
      </Row>
      
      <DoctorTypeModal></DoctorTypeModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorTypes: () => dispatch(GetDoctorTypesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
