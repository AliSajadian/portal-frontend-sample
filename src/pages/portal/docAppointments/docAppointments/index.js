import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import DocAppointments from "../docAppointments/docAppointmentsCard/docAppointments";
import { GetDocScheduleDaysList } from "../../../../redux/actions/docScheduleDaysActions";
import { GetDocAppointmentTimesList, GetDocAppointmentsList } from "../../../../redux/actions/docAppointmentsActions";
import { GetDoctorsList } from "../../../../redux/actions/doctorsActions";
import { GetEmployeesList } from "../../../../redux/actions/employeesActions";
import { GetDocScheduleWeeklyDaysList } from "../../../../redux/actions/docScheduleWeeklyDaysActions";



const Index = (props) => {
  useEffect(() => {
    props.getEmployeesList();
    props.getDoctors();
    props.getDocScheduleDaysList();
    props.getDocAppointmentsList();
    props.getDocAppointmentTimesList();
    props.getDocScheduleWeeklyDaysList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">نوبت دهی</h1> */}

      <Row>
        <Col>
          <DocAppointments></DocAppointments>
        </Col>
      </Row>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeesList: () => dispatch(GetEmployeesList()),
    getDoctors: () => dispatch(GetDoctorsList()),
    getDocAppointmentsList: () => dispatch(GetDocAppointmentsList()),
    getDocAppointmentTimesList: () => dispatch(GetDocAppointmentTimesList()),
    getDocScheduleWeeklyDaysList: () => dispatch(GetDocScheduleWeeklyDaysList()),
    getDocScheduleDaysList: () => dispatch(GetDocScheduleDaysList())
  }
}

export default connect(null, mapDispatchToProps)(Index);
