import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import PatientsList from "./patientsList/patientsList";
import { GetPatientsFilesList } from "../../../../redux/actions/patientsActions";
import { GetEmployeesList } from "../../../../redux/actions/employeesActions";
import { GetDocScheduleDaysList } from "../../../../redux/actions/docScheduleDaysActions";
import { GetFilteredDocAppointmentTimesList, GetDocAppointmentsList } from "../../../../redux/actions/docAppointmentsActions";
import { GetDoctorsList } from "../../../../redux/actions/doctorsActions";



const Index = (props) => {
  useEffect(() => {
    let userID = sessionStorage.getItem('userid')
    props.getDoctors();
    props.GetEmployeesList();
    props.getDocScheduleDaysList();
    props.getDocAppointmentsList();
    props.getFilteredDocAppointmentTimesList(userID);
    props.getPatientsFilesList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">سوابق بیمار</h1> */}

      <Row>
        <Col>
          <PatientsList></PatientsList>
        </Col>
      </Row>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPatientsFilesList: () => dispatch(GetPatientsFilesList()),
    getDocAppointmentsList: () => dispatch(GetDocAppointmentsList()),
    getFilteredDocAppointmentTimesList: userID => dispatch(GetFilteredDocAppointmentTimesList(userID)),
    getDocScheduleDaysList: () => dispatch(GetDocScheduleDaysList()),
    GetEmployeesList: () => dispatch(GetEmployeesList()),
    getDoctors: () => dispatch(GetDoctorsList()),
  }
}


export default connect(null, mapDispatchToProps)(Index);
