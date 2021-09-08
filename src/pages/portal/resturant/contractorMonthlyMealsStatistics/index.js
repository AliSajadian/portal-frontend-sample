import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import ContractorDailyMealsStatisticsList from "./contractorMonthlyMealsStatistics";
import { GetContractorMonthlyMealsStatistics } from "../../../../redux/actions/personelMealDayActions";
import { GetCurrentMonthDates } from "../../../../redux/actions/mealsDayActions";



const Index = (props) => {
  useEffect(() => {
    props.getCurrentMonthDates(true);
    props.getContractorMonthlyMealsStatistics();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      <Row>
        <Col >
          <ContractorDailyMealsStatisticsList/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContractorMonthlyMealsStatistics: () => dispatch(GetContractorMonthlyMealsStatistics()),
    getCurrentMonthDates: (isCurrentMonth) => dispatch(GetCurrentMonthDates(isCurrentMonth)),  
  }
}

export default connect(null, mapDispatchToProps)(Index);

