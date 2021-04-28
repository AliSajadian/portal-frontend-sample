import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import SavedPrsonelMealDayList from "../savedPersonelMealDay/savedsPersonelMealDay";
import { GetPersonelMealDaysList } from "../../../../redux/actions/personelMealDayActions";
import { GetMealDaysList } from "../../../../redux/actions/mealsDayActions";
import { GetMealsList } from "../../../../redux/actions/mealsActions";
import { GetCurrentMonthDates } from "../../../../redux/actions/mealsDayActions";


const Index = (props) => {
  useEffect(() => {
    props.getCurrentMonthDates();
    props.getMealDaysList();
    props.getMealsList();
    props.getPersonelMealDaysList();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      <h1 className="h3 mb-3">Personel Meal Day</h1>
      <Row>
        <Col >
          <SavedPrsonelMealDayList/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonelMealDaysList: () => dispatch(GetPersonelMealDaysList()),
    getMealsList: () => dispatch(GetMealsList()),
    getMealDaysList: () => dispatch(GetMealDaysList()),
    getCurrentMonthDates: () => dispatch(GetCurrentMonthDates())    
  }
}

export default connect(null, mapDispatchToProps)(Index);

