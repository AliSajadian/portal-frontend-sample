import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import DoctorScheduleDays from "../docScheduleDays/docScheduleDaysCard/docScheduleDays";
import { GetDocScheduleDaysList } from "../../../../redux/actions/docScheduleDaysActions";
import { GetDocScheduleWeeklyDaysList } from "../../../../redux/actions/docScheduleWeeklyDaysActions";
import { GetDoctorsList } from "../../../../redux/actions/doctorsActions";
import { GetEmployeesList } from "../../../../redux/actions/employeesActions";



const Index = (props) => {

  useEffect(() => {
    props.getEmployeesList();
    props.getDoctors();
    props.getDocScheduleWeeklyDaysList();
    props.getDocScheduleDaysList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">برنامه روزانه</h1> */}

      <Row>
        <Col>
          <DoctorScheduleDays></DoctorScheduleDays>
        </Col>
      </Row>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeesList: () => dispatch(GetEmployeesList()),
    getDoctors: () => dispatch(GetDoctorsList()),
    getDocScheduleWeeklyDaysList: () => dispatch(GetDocScheduleWeeklyDaysList()),
    getDocScheduleDaysList: () => dispatch(GetDocScheduleDaysList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
