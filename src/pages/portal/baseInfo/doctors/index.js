import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import DoctorsList from "../doctors/doctorsList/doctors";
import { GetDoctorEmployeesList } from "../../../../redux/actions/employeesActions";
import { GetDoctorTypesList } from "../../../../redux/actions/doctorTypesActions";
import { GetDoctorsList } from "../../../../redux/actions/doctorsActions";
import DoctorModal from "../doctors/doctorsModal/doctorsModal";


const Index = (props) => {

  useEffect(() => {
    props.getDoctorTypes();
    props.getDoctorEmployeesList();
    props.getDoctors();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">پزشک</h1> */}

      <Row>
        <Col>
          <DoctorsList></DoctorsList>
        </Col>
      </Row>
      
      <DoctorModal></DoctorModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorEmployeesList: () => dispatch(GetDoctorEmployeesList()),
    getDoctors: () => dispatch(GetDoctorsList()),
    getDoctorTypes: () => dispatch(GetDoctorTypesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
