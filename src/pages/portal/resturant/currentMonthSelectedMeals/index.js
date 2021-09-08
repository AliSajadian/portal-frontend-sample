import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import CurrentMonthSelectedMeals from "./currentMonthSelectedMeals";
import { GetCurrentMonthSelectedMealsList } from "../../../../redux/actions/personelMealDayActions";


const Index = (props) => {
  useEffect(() => {
    const employee_id = sessionStorage.getItem('employeeid');
    props.getCurrentMonthSelectedMealsList(employee_id);
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3"> انتخاب ماهیانه غذا </h1> */}
      <Row>
        <Col >
          <CurrentMonthSelectedMeals/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentMonthSelectedMealsList: (employee_id) => dispatch(GetCurrentMonthSelectedMealsList(employee_id)),
  }
}

export default connect(null, mapDispatchToProps)(Index);

