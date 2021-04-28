import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import PrsonelMealDayList from "../personelMealDay/personelMealDay";
import { GetPersonelMealDaysExList } from "../../../../redux/actions/personelMealDayActions";
import { GetMealDaysList } from "../../../../redux/actions/mealsDayActions";
import { GetMealsList } from "../../../../redux/actions/mealsActions";
import { GetCurrentMonthDates } from "../../../../redux/actions/mealsDayActions";


const Index = (props) => {
  useEffect(() => {
    const employee_id = sessionStorage.getItem('employeeid');
    props.getPersonelMealDaysExList(employee_id);
    props.getCurrentMonthDates();
    props.getMealDaysList();
    props.getMealsList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3"> انتخاب ماهیانه غذا </h1> */}
      <Row>
        <Col >
          <PrsonelMealDayList/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonelMealDaysExList: (employee_id) => dispatch(GetPersonelMealDaysExList(employee_id)),
    getMealsList: () => dispatch(GetMealsList()),
    getMealDaysList: () => dispatch(GetMealDaysList()),
    getCurrentMonthDates: () => dispatch(GetCurrentMonthDates())    
  }
}

export default connect(null, mapDispatchToProps)(Index);

