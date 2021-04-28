import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import AppointmentConfirmation from "./docAppointmentConfirmation/docAppointmentConfirmation";
import DocAppointmentModal from "./docAppointmentModal/docAppointmentModal";
// import { GetPatientsFilesList } from "../../../../redux/actions/patientsActions";
import { GetDocScheduleWeeklyDaysList } from "../../../../redux/actions/docScheduleWeeklyDaysActions";
import { GetDocScheduleDaysList } from "../../../../redux/actions/docScheduleDaysActions";
import { GetFilteredDocAppointmentTimesList, GetDocAppointmentsList } from "../../../../redux/actions/docAppointmentsActions";
import { GetEmployeesList } from "../../../../redux/actions/employeesActions";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";
import { GetDoctorsList } from "../../../../redux/actions/doctorsActions";



const Index = (props) => {
  useEffect(() => {
    let userID = sessionStorage.getItem('userid')
   
    props.getCompaniesList();
    props.getDepartmentsList();
    props.getDoctors();
    props.GetEmployeesList();
    props.getDocScheduleDaysList();
    props.getDocScheduleWeeklyDaysList();
    props.getDocAppointmentsList();
    props.getFilteredDocAppointmentTimesList(userID);
    // props.getPatientsFilesList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">سوابق بیمار</h1> */}

      <Row>
        <Col>
          <AppointmentConfirmation></AppointmentConfirmation>
        </Col>
      </Row>

      <DocAppointmentModal></DocAppointmentModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPatientsFilesList: () => dispatch(GetPatientsFilesList()),
    getCompaniesList: () => dispatch(GetCompaniesList()),
    getDepartmentsList: () => dispatch(GetDepartmentsList()),
    GetEmployeesList: () => dispatch(GetEmployeesList()),
    getDoctors: () => dispatch(GetDoctorsList()),
    getDocScheduleWeeklyDaysList: () => dispatch(GetDocScheduleWeeklyDaysList()),
    getDocScheduleDaysList: () => dispatch(GetDocScheduleDaysList()),
    getFilteredDocAppointmentTimesList: userID => dispatch(GetFilteredDocAppointmentTimesList(userID)),
    getDocAppointmentsList: () => dispatch(GetDocAppointmentsList()),
  }
}


export default connect(null, mapDispatchToProps)(Index);
