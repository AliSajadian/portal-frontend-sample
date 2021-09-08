import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import MealsDayList from "../mealsDay/mealsDay";
import { 
  GetMealsList, 
} from "../../../../redux/actions/mealsActions";
import { 
  GetMealDaysExList, 
  GetMonthDatesEx 
} from "../../../../redux/actions/mealsDayActions";


const Index = (props) => {
  useEffect(() => {
    let date = new Date()
    let y = date.getFullYear(); 
    let month = date.getMonth()+1;
    let day = date.getDate();
    let currentDate = String(y) + '-' + (month > 9 ? String(month) : '0' + String(month)) + '-' + (day > 9 ? String(day) : '0' + String(day))

    props.getMealsList();
    props.getMealDaysExList(currentDate)
    props.getMonthDatesEx(date)
  }, []);

  return (
    <Container className="p-0">
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
    getMealDaysExList: (date) => dispatch(GetMealDaysExList(date)),    
    getMonthDatesEx: (selectedDate) => dispatch(GetMonthDatesEx(selectedDate)),    
}}

export default connect(null, mapDispatchToProps)(Index);

