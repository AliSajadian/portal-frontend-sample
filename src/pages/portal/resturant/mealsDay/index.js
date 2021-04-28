import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import MealsDayList from "../mealsDay/mealsDay";
// import { GetMealDaysList } from "../../../../redux/actions/mealsDayActions";
import { GetMealDaysExList } from "../../../../redux/actions/mealsDayActions";
import { GetMealsList } from "../../../../redux/actions/mealsActions";
import { GetCurrentMonthDates } from "../../../../redux/actions/mealsDayActions";



const Index = (props) => {
  useEffect(() => {
    // console.log("start useEffect Mealls Days---------------------")
    props.getMealsList();
    // props.getMealDaysList();
    props.getMealDaysExList()
    props.getCurrentMonthDates();
    // console.log("End useEffect Mealls Days---------------------")
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">غذاهای ماهیانه</h1> */}
      <Row>
        <Col >
          <MealsDayList></MealsDayList>
        </Col>
      </Row>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealsList: () => dispatch(GetMealsList()),
    // getMealDaysList: () => dispatch(GetMealDaysList()),
    getMealDaysExList: () => dispatch(GetMealDaysExList()),    
    getCurrentMonthDates: () => dispatch(GetCurrentMonthDates())
}}

export default connect(null, mapDispatchToProps)(Index);

