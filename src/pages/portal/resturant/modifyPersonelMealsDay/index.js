import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import ModifyPersonelMealsDay from "./modifyPersonelMealsDay";
import { GetPersonelMealDaysCurrentMonthList } from "../../../../redux/actions/personelMealDayActions";
import { GetMealDaysCurrentMonthList } from "../../../../redux/actions/mealsDayActions";
import { GetMealsList } from "../../../../redux/actions/mealsActions";
import { GetCurrentMonthDates } from "../../../../redux/actions/mealsDayActions";


const Index = (props) => {
  useEffect(() => {
    const employee_id = sessionStorage.getItem('employeeid');
    props.getPersonelMealDaysCurrentMonthList(employee_id);
    props.getCurrentMonthDates(true);
    props.getMealDaysCurrentMonthList();
    props.getMealsList();
  }, []);

  return (
    <Container className="p-0">
      <Row>
        <Col >
          <ModifyPersonelMealsDay/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonelMealDaysCurrentMonthList: (employee_id) => dispatch(GetPersonelMealDaysCurrentMonthList(employee_id)),
    getMealsList: () => dispatch(GetMealsList()),
    getMealDaysCurrentMonthList: () => dispatch(GetMealDaysCurrentMonthList()),
    getCurrentMonthDates: (isCurrentMonth) => dispatch(GetCurrentMonthDates(isCurrentMonth))    
  }
}

export default connect(null, mapDispatchToProps)(Index);

