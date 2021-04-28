import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import DoctorScheduleWeeklyDays from "../docScheduleWeeklyDays/docScheduleWeeklyDaysCard/docScheduleWeeklyDays";
import { GetDocScheduleWeeklyDaysList } from "../../../../redux/actions/docScheduleWeeklyDaysActions";
import { GetDoctorsList } from "../../../../redux/actions/doctorsActions";
import { GetEmployeesList } from "../../../../redux/actions/employeesActions";



const Index = (props) => {

  useEffect(() => {
    props.getEmployeesList();
    props.getDoctors();
    props.getDocScheduleWeeklyDaysList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">برنامه هفتگی</h1> */}
      <Row>
        <Col>
          <DoctorScheduleWeeklyDays></DoctorScheduleWeeklyDays>
        </Col>
      </Row>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeesList: () => dispatch(GetEmployeesList()),
    getDoctors: () => dispatch(GetDoctorsList()),
    getDocScheduleWeeklyDaysList: () => dispatch(GetDocScheduleWeeklyDaysList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
