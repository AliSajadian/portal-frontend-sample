import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import PrsonelMealDayList from "../personelMealDay/personelMealDay";
import { GetPersonelMealDaysNextMonthList } from "../../../../redux/actions/personelMealDayActions";
import { GetMealDaysNextMonthList } from "../../../../redux/actions/mealsDayActions";
import { GetMealsList } from "../../../../redux/actions/mealsActions";
import { GetCurrentMonthDates } from "../../../../redux/actions/mealsDayActions";


const Index = (props) => {
  useEffect(() => {
    const employee_id = sessionStorage.getItem('employeeid');
    props.getMealDaysNextMonthList();
    props.getPersonelMealDaysNextMonthList(employee_id);
    props.getCurrentMonthDates(false);
    props.getMealsList();
  }, []);

  return (
    <Container className="p-0">
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
    getPersonelMealDaysNextMonthList: (employee_id) => dispatch(GetPersonelMealDaysNextMonthList(employee_id)),
    getMealsList: () => dispatch(GetMealsList()),
    getMealDaysNextMonthList: () => dispatch(GetMealDaysNextMonthList()),
    getCurrentMonthDates: (isCurrentMonth) => dispatch(GetCurrentMonthDates(isCurrentMonth))    
  }
}

export default connect(null, mapDispatchToProps)(Index);

