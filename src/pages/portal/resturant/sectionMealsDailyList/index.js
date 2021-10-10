import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import SectionMealsDailyList from "./sectionMealsDailyList";
import { 
  GetSectionName,
  GetSectionsMealsDailyList,
  GetSectionDayMealsStatistics,
} from "../../../../redux/actions/personelMealDayActions";



const Index = (props) => {
  useEffect(() => {
    const employeeId = Number(sessionStorage.getItem("employeeid"))
    props.getSectionDayMealsStatistics(employeeId);
    props.getSectionsMealsDailyList(employeeId);
    props.getSectionName(employeeId);
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      <Row>
        <Col >
          <SectionMealsDailyList/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSectionName: (employeeId) => dispatch(GetSectionName(employeeId)),
    getSectionsMealsDailyList: (employeeId) => dispatch(GetSectionsMealsDailyList(employeeId)),
    getSectionDayMealsStatistics: (employeeId) => dispatch(GetSectionDayMealsStatistics(employeeId)),
  }
}

export default connect(null, mapDispatchToProps)(Index);

